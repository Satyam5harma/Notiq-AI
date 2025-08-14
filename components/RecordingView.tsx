import React, { useState, useEffect, useCallback, useRef } from 'react';
import { processTranscript } from '../services/geminiService';
import type { Note } from '../types';
import MicIcon from './icons/MicIcon';
import StopIcon from './icons/StopIcon';
import Spinner from './Spinner';

interface RecordingViewProps {
    onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

// @ts-ignore
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition: any;
if(SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
}

const RecordingView: React.FC<RecordingViewProps> = ({ onSave }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const finalTranscriptRef = useRef('');

    const reset = () => {
        setTranscript('');
        finalTranscriptRef.current = '';
        setIsRecording(false);
        setIsProcessing(false);
        setError(null);
    }

    const handleResult = useCallback((event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscriptRef.current += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        setTranscript(finalTranscriptRef.current + interimTranscript);
    }, []);

    const startRecording = () => {
        if (!recognition) {
            setError("Speech recognition is not supported in this browser.");
            return;
        }
        reset();
        setIsRecording(true);
        recognition.start();
    };

    const stopRecording = useCallback(async () => {
        if (!recognition) return;
        setIsRecording(false);
        recognition.stop();
        
        const finalTranscript = transcript.trim();

        if (finalTranscript.length > 0) {
            setIsProcessing(true);
            try {
                const processedData = await processTranscript(finalTranscript);
                onSave({
                    title: processedData.title,
                    summary: processedData.summary,
                    tags: processedData.tags,
                    transcript: finalTranscript
                });
                // DO NOT call reset() here. The component will unmount upon successful save.
            } catch (err) {
                console.error("Failed to process and save note", err);
                setError("Failed to process your note. Please try again.");
                setIsProcessing(false);
            }
        } else {
            reset(); // Reset if there was no speech to save.
        }
    }, [transcript, onSave]);

    useEffect(() => {
        if (!recognition) return;

        const handleError = (event: any) => setError(`Speech recognition error: ${event.error}`);
        
        recognition.addEventListener('result', handleResult);
        recognition.addEventListener('error', handleError);

        return () => {
            recognition.removeEventListener('result', handleResult);
            recognition.removeEventListener('error', handleError);
            if (isRecording) {
               recognition.stop();
            }
        };
    }, [handleResult, isRecording]);

    if (!recognition) {
         return (
            <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-900 text-center">
                <h1 className="text-2xl font-bold text-red-400">Browser Not Supported</h1>
                <p className="text-slate-300 mt-4">
                    Sorry, the Web Speech API is not available in your browser. <br/>
                    Please try Chrome or Edge for the best experience.
                </p>
            </div>
        );
    }
    
    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-900">
                <Spinner text="Analyzing your note..."/>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-100 mb-4">
                {isRecording ? "Listening..." : "Create a New Note"}
            </h1>
            <p className="text-slate-400 mb-8">
                {isRecording ? "Click the stop button to finish." : "Click the microphone to start recording."}
            </p>

            <div className="relative mb-8">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300
                        ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'}`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                    {isRecording ? <StopIcon className="w-12 h-12 text-white" /> : <MicIcon className="w-12 h-12 text-white" />}
                </button>
                {isRecording && <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping -z-10" aria-hidden="true"></div>}
            </div>

            {error && <p className="text-red-400 mb-4" role="alert">{error}</p>}
            
            <div className="w-full max-w-2xl min-h-[100px] bg-slate-800/50 rounded-lg p-4 text-slate-300" aria-live="polite">
                {transcript || <span className="text-slate-500">Your live transcript will appear here...</span>}
            </div>
        </div>
    );
};

export default RecordingView;
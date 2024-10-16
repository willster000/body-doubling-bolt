import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DailyIframe from '@daily-co/daily-js';
import { useTask } from '../contexts/TaskContext';
import { Video, Mic, MicOff, VideoOff, MessageSquare } from 'lucide-react';

const ChatRoom: React.FC = () => {
  const [videoCall, setVideoCall] = useState<DailyIframe.DailyCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { currentTask } = useTask();
  const location = useLocation();
  const { matchedUserId, task } = location.state as { matchedUserId: string; task: string };

  useEffect(() => {
    if (videoContainerRef.current) {
      const dailyCall = DailyIframe.createFrame(videoContainerRef.current, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
          borderRadius: '12px',
        },
      });

      // Use the matchedUserId to create a unique room name
      const roomName = `task-${task}-${matchedUserId}`.replace(/\s+/g, '-').toLowerCase();
      dailyCall.join({ url: `https://your-daily-domain.daily.co/${roomName}` });
      setVideoCall(dailyCall);

      return () => {
        dailyCall.destroy();
      };
    }
  }, [matchedUserId, task]);

  const toggleAudio = () => {
    if (videoCall) {
      videoCall.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (videoCall) {
      videoCall.setLocalVideo(!isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Body Doubling Session</h2>
          <p className="mb-4">Current Task: {task}</p>
          <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden" ref={videoContainerRef}></div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-2 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg">
            <MessageSquare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
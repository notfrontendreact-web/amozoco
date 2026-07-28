import React, { useState } from 'react';
import { Play, X, Video, UserCheck, Eye, Clock } from 'lucide-react';
import { VideoShowcase } from '../../types';

interface VideoShowcaseSliderProps {
  videos: VideoShowcase[];
}

export const VideoShowcaseSlider: React.FC<VideoShowcaseSliderProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoShowcase | null>(null);

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 shadow-xl my-6 text-white border border-indigo-900/50 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>رسانه و ویدیوهای آموزکو</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            بررسی تخصصی و راهنمای ویدئویی محصولات
          </h2>
        </div>
        <p className="text-xs text-slate-300 max-w-md leading-relaxed">
          آموزش گام به گام راه‌اندازی و تست عملی تجهیزات رباتیک، بردها و پرینترها توسط اساتید آموزکو
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {videos.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedVideo(item)}
            className="group relative bg-slate-800/80 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 shadow-lg cursor-pointer transition-all hover:-translate-y-1"
          >
            {/* Thumbnail Image */}
            <div className="relative aspect-16/10 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white mr-0.5" />
                </div>
              </div>

              {/* Video Specs Badges */}
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <span className="bg-slate-900/80 backdrop-blur-md text-[11px] px-2 py-0.5 rounded-md font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {item.duration}
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 text-slate-300">
                  <Eye className="w-3 h-3 text-sky-400" />
                  {item.views}
                </span>
              </div>
            </div>

            {/* Video Meta info */}
            <div className="p-4 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-white/5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item.instructor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-white/10">
              <h3 className="font-bold text-sm md:text-base text-white">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={selectedVideo.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
              >
                مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

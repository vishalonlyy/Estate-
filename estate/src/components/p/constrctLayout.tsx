/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';

export default function ConstrctLayout() {
    const [activeTab, setActiveTab] = useState<'sitemap' | 'floorplan'>('sitemap');
    const FloorMaps = [
        { id: 0, src: '/maps/FloorMaps/FloorMap1.jpeg' },
        { id: 1, src: '/maps/FloorMaps/FloorMap2.jpeg' },
        { id: 2, src: '/maps/FloorMaps/FloorMap3.jpeg' },

    ];
    const FloorPlanGrid = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {FloorMaps.map((_, i) => (
                <div key={i} className="relative aspect-auto bg-white/10 rounded-lg overflow-hidden
                 hover:scale-105
                 transition-transform duration-300 cursor-pointer backdrop-blur-sm border border-white/20">
                    <img 
                        src={_.src} 
                        alt={`Floor Plan ${i + 1}`}
                        className="w-full h-full object-contain object-center justify-self-center"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div id="siteplan"
        className="relative mx-auto px-4 py-8">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/img/Mapbg.jpg')] bg-cover
             bg-center opacity-[1]
             blur-2px]"></div>
            
            {/* Content */}
            <div className="relative">
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
                    Construction Layout
                </h2>

                {/* Tab Buttons */}
                <div className="flex justify-center gap-8 mb-8">
                    <button
                        onClick={() => setActiveTab('sitemap')}
                        className={`pb-2 px-4 text-lg font-medium transition-all duration-300 relative
                            ${activeTab === 'sitemap' ? 'text-emerald-600' : 'text-white hover:text-gray-800'}`}
                    >
                        Site Map
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transition-transform duration-300
                            ${activeTab === 'sitemap' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                    </button>
                    <button
                        onClick={() => setActiveTab('floorplan')}
                        className={`pb-2 px-4 text-lg font-medium transition-all duration-300 relative
                            ${activeTab === 'floorplan' ? 'text-emerald-600' : 'text-white hover:text-gray-800'}`}
                    >
                        Cluster
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transition-transform duration-300
                            ${activeTab === 'floorplan' ? 'scale-x-100' : 'scale-x-0'}`}
                        />
                    </button>
                </div>

                {/* Content Based on Active Tab */}
                {activeTab === 'sitemap' ? (
                    <img 
                        src='/img/map.png' 
                        alt='map' 
                        className='w-full h-[400px] aspect-auto object-contain justify-self-center xxsm:scale-[0.8] sm:scale-[0.75] md:scale-[1] ' 
                    />
                ) : (
                    <FloorPlanGrid />
                )}
            </div>
        </div>
    );
}
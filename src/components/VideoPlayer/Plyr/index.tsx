import Plyr from 'plyr';
import Hls from 'hls.js';
import {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import 'plyr/dist/plyr.css';
import episodes from "@components/Episodes";

const VideoPlayer = ({src, subtitles, skipTime, banner, id, ep}: {
    src: string,
    subtitles: any,
    skipTime: any,
    banner: string,
    id: number,
    ep: number
}) => {
    const [skipVisible, setSkipVisible] = useState<boolean>(false)
    const options: any = {
        seekTime: 5,
        keyboard: {focused: true, global: true},
        captions: {active: true, update: true},
        quality: {default: 1080, forced: true, options: [1080, 720, 480, 360]},
        storage: {enabled: true, key: 'plyr'},
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'duration',
            'rewind',
            'fast-forward',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
    };

    function handleIntro(player: Plyr) {
        if (!player.playing) return;
        if (Math.round(player.currentTime) >= skipTime.start && Math.round(player.currentTime) <= skipTime.end) {
            setSkipVisible(true)
        } else {
            setSkipVisible(false)
        }
    }

    function getWatchedTime(): number {
        const prevTime = localStorage.getItem(`watch-${id}-${ep}`);
        if (prevTime) {
            return parseInt(prevTime)
        }
        return 0
    }

    useEffect(() => {
        (() => {
            const video = document.querySelector('video');

            if (!Hls.isSupported()) {
                video.src = src;
                const player = new Plyr(video, options);
                player.poster = banner;

                player.on('loadedmetadata', () => {
                    player.currentTime = getWatchedTime()
                });

                if (skipTime) player.on('timeupdate', () => handleIntro(player));

                setInterval(() => {
                    if (!player.playing) return;
                    if (Math.round(player.currentTime) === 0) return;
                    if (Math.round(player.currentTime) >= Math.round(player.duration) - 60) return localStorage.removeItem(`watch-${id}-${ep}`);
                    localStorage.setItem(`watch-${id}-${ep}`, Math.round(player.currentTime).toString())
                }, 5000);
            } else {
                const hls = new Hls();
                hls.loadSource(src);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    const availableQualities = hls.levels.map((l) => l.height)
                    availableQualities.unshift(0)

                    options.quality = {
                        default: 0,
                        options: availableQualities,
                        forced: true,
                        onChange: (e) => updateQuality(e),
                    }
                    options.i18n = {
                        qualityLabel: {
                            0: 'Auto',
                        },
                    }

                    hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
                        const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span")
                        if (hls.autoLevelEnabled) {
                            span.innerHTML = `Auto (${hls.levels[data.level].height}p)`
                        } else {
                            span.innerHTML = `Auto`
                        }
                    })
                    const player = new Plyr(video, options);
                    player.poster = banner;

                    player.on('loadedmetadata', () => {
                        player.currentTime = getWatchedTime()
                    });

                    if (skipTime) player.on('timeupdate', () => handleIntro(player));

                    setInterval(() => {
                        if (!player.playing) return;
                        if (Math.round(player.currentTime) === 0) return;
                        if (Math.round(player.currentTime) >= Math.round(player.duration) - 60) return localStorage.removeItem(`watch-${id}-${ep}`);
                        localStorage.setItem(`watch-${id}-${ep}`, Math.round(player.currentTime).toString())
                    }, 5000);
                });

                hls.attachMedia(video);
                (window as any).hls = hls;
            }

            function updateQuality(newQuality) {
                if (newQuality === 0) {
                    (window as any).hls.currentLevel = -1;
                } else {
                    (window as any).hls.levels.forEach((level, levelIndex) => {
                        if (level.height === newQuality) {
                            (window as any).hls.currentLevel = levelIndex;
                        }
                    });
                }
            }
        })()
        //eslint-disable-next-line
    }, [src, banner]);

    return (
        <>
            <div className={"relative w-full"}>
                <video className={"js-plyr plyr aspect-video"} id='player' key={'plyr'} crossOrigin={'anonymous'}
                       src={src}>
                    {subtitles?.length > 0 && (subtitles.find((sub) => sub.lang === 'English') || subtitles.find((sub) => sub.lang === '[en-US] English')) && (
                        <track
                            label='English'
                            kind={'captions'}
                            srcLang='en'
                            src={subtitles.find((sub) => sub.lang === 'English')?.url || subtitles.find((sub) => sub.lang === '[en-US] English')?.url}
                        ></track>
                    )}
                </video>
                {skipVisible && (
                    <div className={"absolute bottom-0 right-0 mb-4 mr-4"}>
                        {ReactDom.createPortal(
                            <button
                                className={"bg-[#A020F0] text-white px-4 ml-[1rem] py-1 rounded-md"}
                                onClick={() => {
                                    const video = document.querySelector('video');
                                    video.currentTime = skipTime.end;
                                    setSkipVisible(false)
                                }}
                            >
                                Skip Intro
                            </button>,
                            document.querySelector('.plyr__controls')
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default VideoPlayer;
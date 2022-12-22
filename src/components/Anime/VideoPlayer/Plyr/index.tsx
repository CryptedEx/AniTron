import Plyr from 'plyr';
import Hls from 'hls.js';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ReactDom from 'react-dom';
import 'plyr/dist/plyr.css';

const VideoPlayer = ({watchData, skipTime, banner}: {
    watchData?: any,
    skipTime?: any,
    banner?: string,
}) => {
    const [skipVisible, setSkipVisible] = useState<boolean>(false)
    let {id, ep} = useRouter().query;

    const options: any = {
        seekTime: 5,
        keyboard: {focused: true, global: true},
        captions: {active: true, update: true},
        quality: {default: 1080, forced: true, options: [1080, 720, 480, 360]},
        storage: {enabled: true, key: 'plyr'},
        controls: [
            'rewind',
            'play-large',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
    };

    const handleIntro = (video: HTMLVideoElement) => {
        if (video.paused) return;
        if (Math.round(video.currentTime) >= skipTime.start && Math.round(video.currentTime) <= skipTime.end) {
            setSkipVisible(true)
        } else {
            setSkipVisible(false)
        }
    };

    const getWatchedTime = (ide, episode): number => {
        const prevTime = localStorage.getItem(`watch-${ide}-${episode}`);
        if (prevTime) return parseInt(prevTime);
        return 0
    };

    useEffect(() => {
        const video = document.querySelector('video');

        if (!Hls.isSupported()) {
            video.src = `https://cors.proxy.consumet.org/${watchData.url}`;
            const player = new Plyr(video, options);
            player.poster = banner;

            video.addEventListener('loadedmetadata', () => {
                player.currentTime = getWatchedTime(id, ep)
            })

            if (skipTime) video.addEventListener('timeupdate', () => handleIntro(video));

            setInterval(() => {
                if (!player.playing) return;
                if (Math.round(player.currentTime) === 0) return;
                if (Math.round(player.duration) - Math.round(player.currentTime) <= 180) return localStorage.removeItem(`watch-${id}-${ep}`);
                localStorage.setItem(`watch-${id}-${ep}`, Math.round(player.currentTime).toString())
            }, 5000);
        } else {
            const hls = new Hls();
            hls.loadSource(`https://cors.proxy.consumet.org/${watchData.url}`);

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

                video.addEventListener('loadedmetadata', () => {
                    player.currentTime = getWatchedTime(id, ep)
                })

                if (skipTime) video.addEventListener('timeupdate', () => handleIntro(video));


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
        //eslint-disable-next-line
    }, [watchData, banner, id, ep]);

    return (
        //todo add react skeleton
        <>
            <div className={"relative w-[90%] ml-auto mr-auto mt-[4rem]"}>
                <video className={"js-plyr plyr aspect-video"} id='player' key={'plyr'} crossOrigin={'anonymous'}>
                    {watchData?.subtitles && (
                        <track
                            label='English'
                            kind={'captions'}
                            srcLang='en'
                            src={`https://cors.proxy.consumet.org/${watchData.subtitles.url}`}
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

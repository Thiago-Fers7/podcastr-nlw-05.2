import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string,
    durationAsString: string,
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    play: (episode: Episode) => void,
    togglePlay: () => void,
    toggleLoop: () => void,
    playNext: () => void,
    playPrevious: () => void,
    setPlayingState: (state: boolean) => void,
    playList: (list: Episode[], index: number) => void,
    hasPrevius: boolean,
    hasNext: boolean,
    isLooping: boolean,
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasPrevius = currentEpisodeIndex > 0
    const hasNext = (currentEpisodeIndex + 1) >= episodeList.length

    function playNext() {
        if (hasNext) {
            return
        } else {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPrevius) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            toggleLoop,
            playList,
            setPlayingState,
            playNext,
            playPrevious,
            hasPrevius,
            hasNext,
            isLooping
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
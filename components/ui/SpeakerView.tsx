import '@stream-io/video-react-sdk/dist/css/styles.css';

import { useCall, useCallStateHooks, ParticipantView, StreamVideoParticipant, SfuModels, Comparator, conditional, combineComparators, screenSharing, dominantSpeaker, pinned, speaking, reactionType, publishingVideo, publishingAudio, VisibilityState } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

export const SpeakerView = () => {
    const call = useCall();
    const { useParticipants } = useCallStateHooks();
    const [participantInSpotlight, ...otherParticipants] = useParticipants();
    const [participantsBar, setParticipantsBar] = useState<HTMLDivElement | null>(
      null,
    );
  
    // determine whether the call is a 1:1 call
    const isOneToOneCall = otherParticipants.length === 1;
    useEffect(() => {
      if (!call) return;
      const customSortingPreset = getCustomSortingPreset(isOneToOneCall);
      call.setSortParticipantsBy(customSortingPreset);
    }, [call, isOneToOneCall]);
  
    useEffect(() => {
      if (!participantsBar || !call) return;
  
      const cleanup = call.dynascaleManager.setViewport(participantsBar);
  
      return () => cleanup();
    }, [participantsBar, call]);
  
    return (
      <div className="speaker-view">
  
        <div className="spotlight">
          {call && participantInSpotlight && (
              <ParticipantView
              participant={participantInSpotlight}
              trackType={
                hasScreenShare(participantInSpotlight)
                  ? 'screenShareTrack'
                  : 'videoTrack'
                }
                />
                )}
        </div>
        {call && otherParticipants.length > 0 && (
        <div ref={setParticipantsBar} className="participants-bar sm:hidden">
            {otherParticipants.map((participant) => (
            <div className="participant-tile" key={participant.sessionId}>
                <ParticipantView participant={participant} />
            </div>
            ))}
        </div>
        )}
      </div>
    );
  };
  
  // utility to determine whether the participant in spotlight is sharing their screen
  const hasScreenShare = (p?: StreamVideoParticipant) =>
    p?.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE);
  
    const getCustomSortingPreset = (
        isOneToOneCall: boolean = false,
      ): Comparator<StreamVideoParticipant> => {
        // 1:1 calls are a special case, where we want to always show the other
        // participant in the spotlight, and not show them in the participants bar.
        if (isOneToOneCall) {
          return (a: StreamVideoParticipant, b: StreamVideoParticipant) => {
            if (a.isLocalParticipant) return 1;
            if (b.isLocalParticipant) return -1;
            return 0;
          };
        }
      
        // the custom sorting preset
        return combineComparators(
          screenSharing,
          dominantSpeaker,
          pinned
        );
      };
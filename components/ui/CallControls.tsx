import {
    CancelCallButton,
    RecordCallButton,
    ScreenShareButton,
    SpeakingWhileMutedNotification,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
  } from '@stream-io/video-react-sdk';

  import { useSearchParams } from 'next/navigation';
  import '@stream-io/video-react-sdk/dist/css/styles.css';
  import type { CallControlsProps } from '@stream-io/video-react-sdk';
  
  const CallControls = ({ onLeave }: CallControlsProps) => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    return (
    <div className="str-video__call-controls">
      {!isPersonalRoom && <RecordCallButton /> }
      {!isPersonalRoom && <ScreenShareButton /> }
      <SpeakingWhileMutedNotification>
        <ToggleAudioPublishingButton />
      </SpeakingWhileMutedNotification>
      <ToggleVideoPublishingButton />
      <CancelCallButton onLeave={onLeave} />
    </div>
  )};

  export default CallControls;
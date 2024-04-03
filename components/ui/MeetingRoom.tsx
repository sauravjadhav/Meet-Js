import {
  StreamTheme,
  CallStatsButton,
  CallingState,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import { SpeakerView } from './SpeakerView';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './SpeakerView.scss';
import CallControls from './CallControls';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { LayoutList, Loader, Users } from 'lucide-react';
import EndCallButton from './EndCallButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [showParticipants, setShowParticipants] = useState(false)
  const router = useRouter();

  const { useCallCallingState } = useCallStateHooks();
  const callState = useCallCallingState();

  if(callState !== CallingState.JOINED) return <Loader />

  return (
    <StreamTheme>
      <SpeakerView />
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
          <CallControls />
          <CallStatsButton />
          <button onClick={()=>setShowParticipants
          ((prev)=> !prev)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <Users  size={20} className='text-white'/>
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton /> }
        </div>
    </StreamTheme>
  );
};

export default MeetingRoom
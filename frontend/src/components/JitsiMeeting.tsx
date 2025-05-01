import React, { useEffect, useRef } from 'react';

interface JitsiMeetingProps {
    roomName: string;
}

const JitsiMeeting: React.FC<JitsiMeetingProps> = ({ roomName }) => {
    const jitsiContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!roomName || !jitsiContainer.current) return;

        const domain = 'meet.jit.si';
        const options = {
            roomName,
            parentNode: jitsiContainer.current,
            width: '100%',
            height: 500,
            configOverwrite: {},
            interfaceConfigOverwrite: {},
        };

        const api = new (window as any).JitsiMeetExternalAPI(domain, options);

        api.addEventListeners({
            readyToClose: () => {
                console.log('Meeting closed');
            },
            participantJoined: (data: any) => {
                console.log('Participant joined:', data);
            },
            participantLeft: (data: any) => {
                console.log('Participant left:', data);
            },
            videoConferenceJoined: (data: any) => {
                console.log('Video conference joined:', data);
            },
            videoConferenceLeft: () => {
                console.log('Video conference left');
            },
        });

        return () => {
            api.dispose();
        };
    }, [roomName]);

    return <div ref={jitsiContainer} style={{ height: '500px', width: '100%' }} />;
};

export default JitsiMeeting;

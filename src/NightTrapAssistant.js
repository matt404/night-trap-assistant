import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const events = [
    { time: 13, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 27, location: 'Living Room', note: '' },
    { time: 35, location: 'Bedroom', note: '' },
    { time: 41, location: 'Bathroom', note: '' },
    { time: 48, location: 'Bathroom', note: '' },
    { time: 67, location: 'Living Room', note: '' },
    { time: 84, location: 'Kitchen', note: '' },
    { time: 99, location: 'Entryway', note: '' },
    { time: 179, location: 'Entryway', note: '' },
    { time: 195, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 207, location: 'Bedroom', note: '' },
    { time: 213, location: 'Living Room', note: '' },
    { time: 222, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 228, location: 'Driveway', note: '' },
    { time: 252, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 262, location: 'Bathroom', note: '' },
    { time: 265, location: 'Bathroom', note: '' },
    { time: 296, location: 'Living Room', note: '' },
    { time: 308, location: 'Living Room', note: '' },
    { time: 332, location: 'Bedroom', note: '' },
    { time: 336, location: 'Driveway', note: '' },
    { time: 340, location: 'Entryway', note: 'CODE CHANGE! DO NOT CHANGE CODE YET!' },
    { time: 353, location: 'Living Room', note: 'CHANGE CODE AFTER THIS AUGER CAPTURE!' },
    { time: 370, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 379, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 410, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 425, location: 'Kitchen', note: '' },
    { time: 447, location: 'Bedroom', note: '' },
    { time: 461, location: 'Driveway', note: '' },
    { time: 471, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 482, location: 'Bedroom', note: '' },
    { time: 494, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 507, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 520, location: 'Bedroom', note: '' },
    { time: 539, location: 'Living Room', note: 'CODE CHANGE!' },
    { time: 551, location: 'Living Room', note: 'CHANGE CODE AFTER THIS AUGER CAPTURE' },
    { time: 562, location: 'Entryway', note: '' },
    { time: 648, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 655, location: 'Driveway', note: '' },
    { time: 659, location: 'Driveway', note: '' },
    { time: 691, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 722, location: 'Living Room', note: '' },
    { time: 757, location: 'Bathroom', note: 'Game over if you miss' },
    { time: 796, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 817, location: 'Entryway', note: 'CODE CHANGE! CHANGE CODE IMMEDIATELY' },
    { time: 837, location: '', note: 'Checkpoint - Any game over after this point will restart here' },
    { time: 837, location: 'Living Room', note: '' },
    { time: 855, location: 'Living Room', note: 'CODE CHANGE! CHANGE CODE IMMEDIATELY' },
    { time: 882, location: 'Hall 2 (Upstairs)', note: 'Augers high-five each other at 14:35, which is hilarious' },
    { time: 905, location: 'Entryway', note: '' },
    { time: 958, location: 'Hall 1 (Downstairs)', note: 'Do not capture Eddie Auger at 15:30' },
    { time: 988, location: 'Driveway', note: '' },
    { time: 998, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 1002, location: 'Living Room', note: 'This one is really inconsistent for me' },
    { time: 1019, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 1033, location: 'Bedroom', note: 'Game over if you miss' },
    { time: 1045, location: 'Living Room', note: '' },
    { time: 1051, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 1066, location: 'Living Room', note: '' },
    { time: 1078, location: 'Bathroom', note: 'SWITCH TO HALL 2 IMMEDIATELY AFTER CAPTURE' },
    { time: 1079, location: 'Hall 2 (Upstairs)', note: 'ACTIVATE TRAP IMMEDIATELY' },
    { time: 1093, location: 'Driveway', note: '' },
    { time: 1097, location: 'Driveway', note: '' },
    { time: 1108, location: 'Entryway', note: '' },
    { time: 1113, location: 'Living Room', note: 'Bad ending if you miss' },
    { time: 1148, location: 'Hall 1 (Downstairs)', note: 'Don\'t trap at 19:07 - Wait for second capture opportunity at 19:08, also game over if you miss' },
    { time: 1161, location: 'Living Room', note: '' },
    { time: 1196, location: 'Entryway', note: 'Tony' },
    { time: 1215, location: 'Living Room', note: 'This one is really inconsistent for me' },
    { time: 1280, location: 'Bedroom', note: '' },
    { time: 1292, location: 'Driveway', note: '' },
    { time: 1306, location: 'Kitchen', note: '' },
    { time: 1314, location: 'Hall 2 (Upstairs)', note: '' },
    { time: 1332, location: 'Bedroom', note: '' },
    { time: 1344, location: 'Hall 1 (Downstairs)', note: '' },
    { time: 1385, location: 'Hall 2 (Upstairs)', note: 'Bonus capture for perfect game: Capture Kelly' },
];

const NightTrapAssistant = () => {

    const [nextEvent, setNextEvent] = useState(events[0]);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
    const eventIndexRef = useRef(0);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                const usEnglishVoice = availableVoices.find(voice => voice.lang === 'en-US') || 
                                      availableVoices.find(voice => voice.default) || 
                                      availableVoices[0];
                setSelectedVoice(usEnglishVoice);
            }
        };
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, [selectedVoice]);

    const startTimer = () => {
        if (!isRunning) {
            startTimeRef.current = Date.now() - elapsedTime * 1000;
            setIsRunning(true);
            
            // Announce next location immediately when starting
            if (eventIndexRef.current < events.length) {
                const nextEventToAnnounce = events[eventIndexRef.current];
                const utterance = new SpeechSynthesisUtterance(`Go to ${nextEventToAnnounce.location} at ${Math.floor(nextEventToAnnounce.time / 60)}:${(nextEventToAnnounce.time % 60).toString().padStart(2, '0')}. ${nextEventToAnnounce.note}`);
                if (selectedVoice) utterance.voice = selectedVoice;
                speechSynthesis.speak(utterance);
            }
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                setElapsedTime(elapsed);

                if (eventIndexRef.current < events.length && elapsed >= events[eventIndexRef.current].time) {
                    eventIndexRef.current++;
                    const nextEventToSet = events[eventIndexRef.current] || null;
                    setNextEvent(nextEventToSet);
                    
                    // Announce next location immediately after current event time passes
                    if (nextEventToSet) {
                        const nextUtterance = new SpeechSynthesisUtterance(`Go to ${nextEventToSet.location} at ${Math.floor(nextEventToSet.time / 60)}:${(nextEventToSet.time % 60).toString().padStart(2, '0')}. ${nextEventToSet.note}`);
                        if (selectedVoice) nextUtterance.voice = selectedVoice;
                        speechSynthesis.speak(nextUtterance);
                    }
                }

                if (eventIndexRef.current >= events.length) {
                    setIsRunning(false);
                }
            }, 500);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, selectedVoice]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const adjustTimer = (seconds) => {
        if (!isRunning) {
            const newTime = Math.max(0, elapsedTime + seconds);
            setElapsedTime(newTime);
            
            // Update event index based on new time
            let newIndex = 0;
            while (newIndex < events.length && events[newIndex].time <= newTime) {
                newIndex++;
            }
            eventIndexRef.current = newIndex;
            setNextEvent(events[newIndex] || null);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a0505 50%, #0a0a0a 75%, #000000 20%)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
            }}></div>
            <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
                <Row className="mb-5">
                    <Col className="text-center">
                        <div>
                            <h1 style={{ 
                                fontSize: '4rem', 
                                fontWeight: 'bold',
                                fontFamily: 'serif',
                                letterSpacing: '2px'
                            }}>NIGHT TRAP</h1>
                            <div style={{
                                fontSize: '2rem',
                                color: '#ff6b6b',
                                fontStyle: 'italic',
                            }}>Assistant</div>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="text-center">
                        <select 
                            value={selectedVoice?.name || ''} 
                            onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
                            style={{ 
                                fontSize: '1.2rem', 
                                padding: '0.5rem', 
                                marginBottom: '1rem', 
                                backgroundColor: '#1a0a0a', 
                                color: '#fff', 
                                border: '2px solid #ff6b6b',
                                borderRadius: '8px',
                            }}
                        >
                            {voices.map(voice => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
                
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-5" style={{ marginBottom: '2rem' }}>
                            <div style={{ 
                                fontSize: '8rem', 
                                fontFamily: 'monospace', 
                                fontWeight: 'bold',
                                border: '3px solid #ff6b6b',
                                borderRadius: '15px',
                                padding: '0px 20px 0px 20px',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            }}>
                                {formatTime(elapsedTime)}
                            </div>
                            {nextEvent && (
                                <div className="text-end">
                                    <div style={{ fontSize: '2rem', color: '#ffc107' }}>Next:</div>
                                    <div style={{ 
                                        fontSize: '3rem', 
                                        fontFamily: 'monospace', 
                                        fontWeight: 'bold', 
                                        color: '#ffc107'
                                    }}>
                                        {formatTime(nextEvent.time)}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex gap-4 justify-content-center mb-4">
                            <Button 
                                variant="success" 
                                size="lg"
                                onClick={startTimer} 
                                disabled={isRunning}
                                style={{ 
                                    fontSize: '2rem', 
                                    padding: '1rem 3rem',
                                    backgroundColor: '#2d5a2d',
                                    border: '2px solid #4caf50',
                                }}
                            >
                                ▶️ Start
                            </Button>
                            <Button 
                                variant="danger" 
                                size="lg"
                                onClick={pauseTimer} 
                                disabled={!isRunning}
                                style={{ 
                                    fontSize: '2rem', 
                                    padding: '1rem 3rem',
                                    backgroundColor: '#5a2d2d',
                                    border: '2px solid #f44336',
                                }}
                            >
                                ⏸️ Pause
                            </Button>
                        </div>
                        
                        {!isRunning && (
                            <div className="d-flex gap-2 justify-content-center">
                                <Button variant="secondary" onClick={() => adjustTimer(-60)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>⏪ -1m</Button>
                                <Button variant="secondary" onClick={() => adjustTimer(-10)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>⏮️ -10s</Button>
                                <Button variant="secondary" onClick={() => adjustTimer(-1)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>◀️ -1s</Button>
                                <Button variant="secondary" onClick={() => adjustTimer(1)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>▶️ +1s</Button>
                                <Button variant="secondary" onClick={() => adjustTimer(10)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>⏭️ +10s</Button>
                                <Button variant="secondary" onClick={() => adjustTimer(60)} style={{ 
                                    fontSize: '1.2rem',
                                    backgroundColor: '#2a2a2a',
                                    border: '1px solid #666'
                                }}>⏩ +1m</Button>
                            </div>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        {nextEvent ? (
                            <div style={{
                                border: '3px solid #ff6b6b',
                                borderRadius: '20px',
                                padding: '2rem',
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                <p style={{ 
                                    fontSize: '2rem', 
                                    color: '#ffc107',
                                    marginBottom: '1rem'
                                }}>Next Location:</p>
                                <p style={{ 
                                    fontSize: '4rem', 
                                    fontWeight: 'bold', 
                                    color: '#ff6b6b',
                                    marginBottom: '1rem'
                                }}>🏠 {nextEvent.location}</p>
                                {nextEvent.note && (
                                    <p style={{ 
                                        fontSize: '1.5rem', 
                                        fontStyle: 'italic', 
                                        color: '#ff9999',
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255, 107, 107, 0.3)'
                                    }}>
                                        ⚠️ Note: {nextEvent.note}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div style={{
                                fontSize: '3rem',
                                color: '#4caf50',
                            }}>✅ All events completed!</div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NightTrapAssistant;

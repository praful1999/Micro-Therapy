import React, { useState, useEffect } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";

const affirmationCategories = [
  { value: 'self-love', label: 'Self-Love' },
  { value: 'motivation', label: 'Motivation' },
  { value: 'relaxation', label: 'Relaxation' },
];

const affirmations = {
  selflove: [
    'You are capable and strong.',
    'You are loved and appreciated.',
    'You are doing your best, and that is enough.',
  ],
  motivation: [
    'You can achieve anything you set your mind to.',
    'You are one step closer to your goal.',
    'Believe in yourself and your abilities.',
  ],
  relaxation: [
    'Take a deep breath and let go of stress.',
    'You are safe and supported.',
    'Allow yourself to relax and unwind.',
  ],
};

const moods = [
  { value: 'happy', label: 'Happy' },
  { value: 'sad', label: 'Sad' },
  { value: 'neutral', label: 'Neutral' },
];

const songs = [
  { title: 'Weightless', artist: 'Marconi Union', url: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
  { title: 'River Flows in You', artist: 'Yiruma', url: 'https://www.youtube.com/watch?v=7maJOI3QMu0' },
  { title: 'Clair de Lune', artist: 'Claude Debussy', url: 'https://www.youtube.com/watch?v=4fVO8Tb5o6U' },
];

const MicroTherapyApp = () => {
  const [affirmationCategory, setAffirmationCategory] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [mood, setMood] = useState('');
  const [reminders, setReminders] = useState(false);
  const [therapySession, setTherapySession] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playSong, setPlaySong] = useState(false);
  const [songList, setSongList] = useState([]);
  const [newSong, setNewSong] = useState({ title: '', artist: '', url: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (affirmationCategory) {
        setAffirmation(affirmations[affirmationCategory][Math.floor(Math.random() * affirmations[affirmationCategory].length)]);
      }
    }, 86400000); // 24 hours

    return () => clearInterval(intervalId);
  }, [affirmationCategory]);

  const handleAffirmationCategoryChange = (value: string) => {
    setAffirmationCategory(value);
  };

  const handleMoodChange = (value: string) => {
    setMood(value);
  };

  const handleReminders = () => {
    setReminders(!reminders);
  };

  const handleTherapySession = () => {
    setTherapySession(true);
    setTimeout(() => {
      setTherapySession(false);
    }, 300000); // 5 minutes
  };

  const handleSubscription = () => {
    setSubscription(true);
  };

  const handleSongChange = (song: any) => {
    setCurrentSong(song);
  };

  const handlePlaySong = () => {
    setPlaySong(true);
  };

  const handleAddSong = () => {
    setSongList([...songList, newSong]);
    setNewSong({ title: '', artist: '', url: '' });
  };

  const handleNewSongChange = (e: any) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-blue-100 rounded-lg">
      <Card className="bg-white rounded-lg shadow-md">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg">
          <CardTitle>Micro Therapy App</CardTitle>
          <CardDescription>Personalized affirmations and 5-minute therapy sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="text-blue-500">Affirmation Category:</Label>
            <Select>
              <SelectTrigger className="w-full bg-blue-100 rounded-lg">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {affirmationCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label className="text-blue-500">Current Mood:</Label>
            <Select>
              <SelectTrigger className="w-full bg-blue-100 rounded-lg">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((mood) => (
                  <SelectItem key={mood.value} value={mood.value}>
                    {mood.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label className="text-blue-500">Daily Affirmation:</Label>
            <p className="text-lg">{affirmation}</p>
          </div>
          <div className="mb-4">
            <Button variant="secondary" className="bg-blue-500 text-white rounded-lg" onClick={handleReminders}>
              {reminders ? 'Reminders On' : 'Reminders Off'}
            </Button>
          </div>
          <div className="mb-4">
            <Button className="bg-blue-500 text-white rounded-lg" onClick={handleTherapySession}>
              Start 5-minute therapy session
            </Button>
            {therapySession && (
              <p className="text-lg">Therapy session in progress...</p>
            )}
          </div>
          <div className="mb-4">
            <Button variant="secondary" className="bg-blue-500 text-white rounded-lg" onClick={handleSubscription}>
              {subscription ? 'Subscribed' : 'Subscribe for premium features'}
            </Button>
          </div>
          <div className="mb-4">
            <Label className="text-blue-500">Relaxing Music:</Label>
            <Select>
              <SelectTrigger className="w-full bg-blue-100 rounded-lg">
                <SelectValue placeholder="Select a song" />
              </SelectTrigger>
              <SelectContent>
                {songs.map((song) => (
                  <SelectItem key={song.title} value={song}>
                    {song.title} by {song.artist}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentSong && (
              <div>
                <p className="text-lg">Now playing: {currentSong.title} by {currentSong.artist}</p>
                <Button className="bg-blue-500 text-white rounded-lg" onClick={handlePlaySong}>
                  Play
                </Button>
                {playSong && (
                  <iframe width="100%" height="315" src={currentSong.url} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label className="text-blue-500">Add Song:</Label>
            <Input type="text" name="title" value={newSong.title} onChange={handleNewSongChange} placeholder="Title" />
            <Input type="text" name="artist" value={newSong.artist} onChange={handleNewSongChange} placeholder="Artist" />
            <Input type="text" name="url" value={newSong.url} onChange={handleNewSongChange} placeholder="URL" />
            <Button className="bg-blue-500 text-white rounded-lg" onClick={handleAddSong}>
              Add Song
            </Button>
          </div>
          <div className="mb-4">
            <Label className="text-blue-500">Song List:</Label>
            <ul>
              {songList.map((song, index) => (
                <li key={index}>{song.title} by {song.artist}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="bg-blue-500 text-white rounded-b-lg">
          <p>&copy; 2023 Micro Therapy App</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MicroTherapyApp;
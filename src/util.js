export default function getMinutesAndSeconds(duration) {
    const minute = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
    return [minute,seconds];
} 
import SpotifyWebApi from "../spotify-web-api-js";

export default async function getEveryAudioFeature(spotify: SpotifyWebApi.SpotifyWebApiJs, everyTrack: SpotifyApi.TrackObjectFull[]) {
  let bottomPointer = 0;
  let topPointer = 100;
  const audioFeatures: SpotifyApi.AudioFeaturesObject[] = [];

  const ArrayOfTrackIDs = everyTrack.filter((eachTrack) => eachTrack !== null).map((eachTrack) => eachTrack.id);

  while (bottomPointer < everyTrack.length) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        const chunk = ArrayOfTrackIDs.slice(bottomPointer, topPointer);

        const chunkOfAudioFeatures = await spotify.getAudioFeaturesForTracks(chunk);

        audioFeatures.push(...chunkOfAudioFeatures.audio_features);

        bottomPointer += 100;
        topPointer += 100;
        if (topPointer > everyTrack.length) {
          topPointer = everyTrack.length;
        }
        resolve();
      }, 1000);
    });
  }

  const cleanAudioFeatures = audioFeatures.filter((eachAudioObject) => eachAudioObject !== null);

  return cleanAudioFeatures;
}
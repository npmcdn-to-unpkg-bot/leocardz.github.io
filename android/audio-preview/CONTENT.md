A simple Android app to stream an audio by url for pre(view|listen)ing it.

If you want to stream audio from a URL or URI (the path of the file inside your device), you will need a few steps shown in code below. You must pay attention when using MediaPlayer.release() and MediaPlayer.reset() methods, because they can lead your app to crash. The code below prevents that.


    
    
    public class MainActivity extends ActionBarActivity {
    
        private final String URL = "https://dl.dropbox.com/s/hgcgq510urmgmed/01%20Main%20Title.mp3";
    
        private MediaPlayer mediaPlayer;
    
        private boolean isPlaying;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
    
           	setUpMediaPlayer();
    
    	streamSong(URL);
        }
    
        private void setUpMediaPlayer() {
            if (mediaPlayer == null) {
                mediaPlayer = new MediaPlayer();
                mediaPlayer.setOnBufferingUpdateListener(bufferingUpdateListener);
                mediaPlayer.setOnCompletionListener(completionListener);
                mediaPlayer.setOnErrorListener(errorListener);
            }
        }
    
        private void streamSong(String url) {
            if (mediaPlayer != null) {
                try {
                    mediaPlayer.setDataSource(url);
                    mediaPlayer.setOnPreparedListener(preparedListener);
                    mediaPlayer.prepareAsync();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    
        private MediaPlayer.OnPreparedListener preparedListener = new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                if (mediaPlayer != null) {
                    isPlaying = true;
                    mediaPlayer.start();
                }
            }
        };
    
        private MediaPlayer.OnCompletionListener completionListener = new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
    	    // End of audio
                isPlaying = false;
            }
        };
    
    
        private MediaPlayer.OnErrorListener errorListener = new MediaPlayer.OnErrorListener() {
            @Override
            public boolean onError(MediaPlayer mediaPlayer, int i, int i2) {
                // Error: We could stream song preview"
                releaseMediaPlayer();
                return false;
            }
        };
    
        private MediaPlayer.OnBufferingUpdateListener bufferingUpdateListener = new MediaPlayer.OnBufferingUpdateListener() {
            @Override
            public void onBufferingUpdate(MediaPlayer mediaPlayer, int i) {
    		// Buffer started to play
            }
        };
    
        private void releaseMediaPlayer() {
            if (mediaPlayer != null) {
                try {
                    if (isPlaying) {
                        mediaPlayer.stop();
                        isPlaying = false;
                    }
                    mediaPlayer.reset();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    
        @Override
        protected void onStop() {
            releaseMediaPlayer();
            super.onStop();
        }
    
    }
    
    





Additionally, you will need these permissions to your manifest file:



    
    
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.INTERNET" />
    
    




That's it!
A simple Android app to record an audio.

I could reach a high quality recording by combining MPEG\_4 format with AAC\_ELD enconding. The AAC\_ELD is available only from Jelly Bean (SDK 16) and setting encoding bit rate to 96000, buy If you want to use this code below version 16\. As [Audio Preview][0], you must pay attention when using MediaPlayer.release(), MediaRecorder.release() and MediaPlayer.reset() methods, because they can lead your app to crash. The code below prevents that.


    
    
    public class MainActivity extends ActionBarActivity {
    
        private static final String LOG_TAG = "AudioRecord";
        private static String root = null;
        private static String audioPlayerName = null;
        private static Long millis;
    
        private Button recordButton = null;
        private Button playButton = null;
    
        private MediaRecorder recorder = null;
        private MediaPlayer mediaPlayer = null;
    
        private boolean isPlaying = false;
        private boolean isRecording = false;
    
        public MainActivity() {
            createDirectoriesIfNeeded();
            millis = Calendar.getInstance().getTimeInMillis();
            audioPlayerName = root + "/" + millis + "audio.mp4";
        }
    
        private void createDirectoriesIfNeeded() {
    
            root = Environment.getExternalStorageDirectory().getAbsolutePath();
    
            File folder = new File(root, "AudioRecord");
    
            if (!folder.exists()) {
                folder.mkdir();
            }
    
            File audioFolder = new File(folder.getAbsolutePath(), "Audio");
    
            if (!audioFolder.exists()) {
                audioFolder.mkdir();
            }
    
            root = audioFolder.getAbsolutePath();
    
        }
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
    
            setContentView(R.layout.activity_main);
    
            setUpIds();
    
            setUpListeners();
    
        }
    
        private void setUpIds() {
            recordButton = (Button) findViewById(R.id.record_button);
            playButton = (Button) findViewById(R.id.play_button);
        }
    
        private void setUpListeners() {
            recordButton.setOnClickListener(recordClickListener);
            playButton.setOnClickListener(playClickListener);
        }
    
    
        private View.OnClickListener recordClickListener = new View.OnClickListener() {
            public void onClick(View v) {
                isRecording = !isRecording;
    
                onRecord(isRecording);
    
                recordButton.setText(isRecording ? R.string.stop_recording : R.string.start_recording);
                playButton.setEnabled(!isRecording);
            }
        };
    
        private View.OnClickListener playClickListener = new View.OnClickListener() {
            public void onClick(View v) {
                isPlaying = !isPlaying;
    
                onPlay(isPlaying);
    
                playButton.setText(isPlaying ? R.string.stop_playing : R.string.start_playing);
                recordButton.setEnabled(!isPlaying);
            }
        };
    
        private void onRecord(boolean start) {
            if (start) {
                startRecording();
            } else {
                stopRecording();
            }
        }
    
        private void onPlay(boolean start) {
            if (start) {
                startPlaying();
            } else {
                stopPlaying();
            }
        }
    
        private void startPlaying() {
            mediaPlayer = new MediaPlayer();
            try {
                mediaPlayer.setDataSource(audioPlayerName);
                mediaPlayer.setOnCompletionListener(completionListener);
                mediaPlayer.prepare();
                mediaPlayer.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    
        private MediaPlayer.OnCompletionListener completionListener = new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                stopPlaying();
            }
        };
    
        private void startRecording() {
    
            recorder = new MediaRecorder();
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            // ACC_ELD is supported only from SDK 16+.
            // You can use other encoders for lower vesions.
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC_ELD);
            recorder.setAudioSamplingRate(44100);
            recorder.setAudioEncodingBitRate(96000);
            recorder.setOutputFile(audioPlayerName);
    
            try {
                recorder.prepare();
                recorder.start();
            } catch (IOException e) {
                e.printStackTrace();
            }
    
        }
    
        private void stopRecording() {
            if (recorder != null) {
                recorder.release();
                completionRecording();
            }
        }
    
        private void stopPlaying() {
            if (mediaPlayer != null) {
                mediaPlayer.reset();
                completionPlaying();
            }
        }
    
        private void reset() {
            isRecording = false;
            isPlaying = false;
        }
    
        private void completionRecording() {
            reset();
            recordButton.setText(R.string.start_recording);
            playButton.setText(R.string.start_playing);
            playButton.setEnabled(true);
        }
    
        private void completionPlaying() {
            reset();
            playButton.setText(R.string.start_playing);
            recordButton.setEnabled(true);
        }
    
        @Override
        public void onPause() {
            super.onPause();
    
            stopRecording();
    
            stopPlaying();
    
        }
    
        @Override
        public void onStop() {
            super.onStop();
    
            stopRecording();
    
            stopPlaying();
    
        }
    
    }
    





    
    
    //R.layout.activity_main
    
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/main_content"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        tools:context="com.leocardz.android.audio.recorder.MainActivity">
    
    
        <Button
            android:id="@+id/record_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/start_recording"  /> 
    
        <Button
            android:id="@+id/play_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:enabled="false"
            android:text="@string/start_playing"  /> 
    
    </LinearLayout> 
    






Additionally, you will need these permissions to your manifest file:


    
    
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
    






That's it!



[0]: http://android.leocardz.com/audio-preview/
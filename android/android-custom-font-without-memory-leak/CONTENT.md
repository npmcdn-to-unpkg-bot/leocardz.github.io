If you want to use custom fonts in your Android app, you have to take note of an issue which might give you a headache: the memory. 


In this tutorial, you will see two ways to use custom fonts without memory leak, even if you use in a ListView. 
Well, these two ways are: XML natively and Java programmatically.



Before showing these ways, let's see how avoid the memory leak. 
You create a SingleTon class to host the font file \*.ttf you put in assets folder.


In this case, open\_sans.ttf file. So, there will be one only instance for the custom class.



    
    
    public class OpenSans {
    
        private static OpenSans instance;
        private static Typeface typeface;
    
        public static OpenSans getInstance(Context context) {
            synchronized (OpenSans.class) {
                if (instance == null) {
                    instance = new OpenSans();
                    typeface = Typeface.createFromAsset(context.getResources().getAssets(), "open_sans.ttf");
                }
                return instance;
            }
        }
    
        public Typeface getTypeFace() {
            return typeface;
        }
    }
    
    




Now the two ways...


### 1\. Natively


You need to create a classe extending from the view you want to custom the typeface. I used a TextView. 



    
    
    public class NativelyCustomTextView extends TextView {
    
    	public NativelyCustomTextView(Context context) {
    		super(context);
    		setTypeface(OpenSans.getInstance(context).getTypeFace());
    	}
    
    	public NativelyCustomTextView(Context context, AttributeSet attrs) {
    		super(context, attrs);
    		setTypeface(OpenSans.getInstance(context).getTypeFace());
    	}
    
    	public NativelyCustomTextView(Context context, AttributeSet attrs,
    			int defStyle) {
    		super(context, attrs, defStyle);
    		setTypeface(OpenSans.getInstance(context).getTypeFace());
    	}
    
    }
    
    




E and use XML as follows.


    
    
    //
    <com.leocardz.views.NativelyCustomTextView
                android:id="@+id/natively_text_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerHorizontal="true"
                android:layout_margin="20dp"
                android:text="@string/natively"
                android:textSize="30sp" /> 
    
    

### 2\. Programmatically


Just find the view by id and set the new typeface. 


    
    
    TextView programmaticallyTextView = (TextView) 
           findViewById(R.id.programmatically_text_view);
    
    programmaticallyTextView.setTypeface(Gothic.getInstance(this)
    				.getTypeFace());
    
    




That's it!
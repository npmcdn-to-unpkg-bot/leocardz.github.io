Animated Expanding ListView provides a fancy animation on expanding or collapsing the content of a list view item.





It works in all version of Android and it's very easy to adapt to your project.




### How to use with Gradle


Simply add the repository to your build.gradle file:


    
    
    repositories {
    	jcenter()
    	maven { url 'https://github.com/leonardocardoso/mvn-repo/raw/master/maven-deploy' }
    }
    
    




And you can use the artifacts like this:

    
    
    dependencies {
    	compile 'com.leocardz:aelv:1.1@aar'
    	// ...
    }
    
    






### Important 




* Your list adapter must extend **ArrayAdapter<? whatever ?\>** 
* Your listview item must extend from AelvListItem

  * Right after you create your listview item, you need to call **yourItem.setUp(int collapsedHeight, int currentHeight, int expandedHeight, boolean isOpen);** to setup the dimensions.

* Your listview item view holder must extend from AelvListViewHolder 

  * Right after you instantiate your view holder you need to call **yourHolder.setViewWrap(viewWrap)**; and tell adapter that you are updating the item size calling **holder.getViewWrap().setLayoutParams(new AbsListView.LayoutParams(AbsListView.LayoutParams.MATCH\_PARENT, listItem.getCurrentHeight()));**.
  * Right before you return the view on your custom adapter, you must call **yourItem.setHolder(yourHolder)**;

* You need to instantiate **Aelv aelv = new Aelv(isAccordion, animationDuration, yourListItems, yourListView, yourAdapter);** right after you setup your listview.
* Last thing: your must implement **listview.setOnItemClickListener();** and insert this **aelv.toggle(view, position);** inside the listener and voilà!



Just check the app example to see it clearly.






Basically, you have to create a custom TranslateAnimation and a Custom List Adapter and, while it's animating, you have to update the current height of listview item and notify the adapter about this change.





![](http://i.imgur.com/j8KK5yh.gif)



![](http://i.imgur.com/rVmezyp.gif)




Something like that:



    
    
    public class ListItem extends AelvListItem {
    
        private String text;
        private int drawable;
    
        public ListItem(String text) {
            super();
            this.text = text;
            this.drawable = R.drawable.down;
        }
    
        public String getText() {
            return text;
        }
    
        public void setText(String text) {
            this.text = text;
        }
    
        public int getDrawable() {
            return drawable;
        }
    
        public void setDrawable(int drawable) {
            this.drawable = drawable;
        }
    
    }
    
    




    
    
    // This allows Android OS to reuse your item in the list
    public class ListViewHolder extends AelvListViewHolder {
        private TextView textView;
    
        public ListViewHolder(TextView textView) {
            super();
            this.textView = textView;
        }
    
        public TextView getTextView() {
            return textView;
        }
    
        public void setTextView(TextView textView) {
            this.textView = textView;
        }
    }
    
    




    
    
    public class ListAdapter extends ArrayAdapter {
        private ArrayList listItems;
        private Context context;
    
        public ListAdapter(Context context, int textViewResourceId, ArrayList listItems) {
            super(context, textViewResourceId, listItems);
            this.listItems = listItems;
            this.context = context;
        }
    
        @Override
        @SuppressWarnings("deprecation")
        public View getView(int position, View convertView, ViewGroup parent) {
            ListViewHolder holder = null;
            ListItem listItem = listItems.get(position);
    
            if (convertView == null) {
                LayoutInflater vi = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                convertView = vi.inflate(R.layout.list_item, null);
    
                LinearLayout textViewWrap = (LinearLayout) convertView.findViewById(R.id.text_wrap);
                TextView text = (TextView) convertView.findViewById(R.id.text);
    
                holder = new ListViewHolder(text);
    
                // setViewWrap IS REQUIRED
                holder.setViewWrap(textViewWrap);
    
            } else {
                holder = (ListViewHolder) convertView.getTag();
            }
    
            // THIS IS REQUIRED
            holder.getViewWrap().setLayoutParams(new AbsListView.LayoutParams(LayoutParams.MATCH_PARENT, listItem.getCurrentHeight()));
    
            holder.getTextView().setText(listItem.getText());
    
            holder.getTextView().setCompoundDrawablesWithIntrinsicBounds(listItem.getDrawable(), 0, 0, 0);
    
            convertView.setTag(holder);
    
            // setHolder IS REQUIRED
            listItem.setHolder(holder);
    
            return convertView;
        }
    
    }
    
    





    
    
    public class MainActivity extends Activity {
    
        private ArrayList listItems;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
    
            ListView listView = (ListView) findViewById(R.id.list);
    
            listItems = new ArrayList();
            mockItems();
    
            ListAdapter adapter = new ListAdapter(this, R.layout.list_item, listItems);
    
            listView.setAdapter(adapter);
    
            // Setup
            // Aelv aelv = new Aelv(true, 200, listItems, listView, adapter);
            final Aelv aelv = new Aelv(true, 200, listItems, listView, adapter, new AelvCustomAction() {
                @Override
                public void onEndAnimation(int position) {
                    listItems.get(position).setDrawable(listItems.get(position).isOpen() ? R.drawable.up : R.drawable.down);
                }
            });
    
            listView.setOnItemClickListener(new OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView parent, View view, int position, long id) {
                    aelv.toggle(view, position);
                }
            });
        }
    
        private void mockItems() {
            final int COLLAPSED_HEIGHT_1 = 150, COLLAPSED_HEIGHT_2 = 200, COLLAPSED_HEIGHT_3 = 250;
            final int EXPANDED_HEIGHT_1 = 250, EXPANDED_HEIGHT_2 = 300, EXPANDED_HEIGHT_3 = 350, EXPANDED_HEIGHT_4 = 400;
    
            ListItem listItem = new ListItem("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
            // setUp IS REQUIRED
            listItem.setUp(COLLAPSED_HEIGHT_1, EXPANDED_HEIGHT_1, false);
            listItems.add(listItem);
    
            listItem = new ListItem("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
            // setUp IS REQUIRED
            listItem.setUp(COLLAPSED_HEIGHT_2, EXPANDED_HEIGHT_2, false);
            listItems.add(listItem);
         
            // ...
    
        }
    
    }
    
    




    
    
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:id="@+id/text_wrap"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin" >
    
        <TextView
            android:id="@+id/text"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="18sp" />
    
    </LinearLayout>
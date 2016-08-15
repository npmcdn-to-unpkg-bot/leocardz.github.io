This tutorial is about how to use multiple layouts in listview.


Basically, you have to follow these steps:


* Create the custom layous;
* Create a custom adapter;
* Override getViewTypeCount() method in your custom adapter with the amount of layouts you're gonna use in your listview;
* Override getItemViewType(int position) method also in your custom adapter to return the current item's view type;
* Additionally, it's essential to use a view holder to avoid memory leaks.




Take a look in the code below.


First, we create custom layouts. In this case, four types.


    
    
    // even
    
     <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:background="#ff500000"
        android:layout_height="match_parent">
    
        <TextView
            android:id="@+id/text"
            android:textColor="@android:color/white"
            android:layout_width="match_parent"
            android:layout_gravity="center"
            android:textSize="24sp"
            android:layout_height="wrap_content" />
    
     </LinearLayout>
    
    




    
    
    // odd
    
     <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:background="#ff001f50"
        android:gravity="right"
        android:layout_height="match_parent">
    
        &ltTextView
            android:id="@+id/text"
            android:textColor="@android:color/white"
            android:layout_width="wrap_content"
            android:layout_gravity="center"
            android:textSize="28sp"
            android:layout_height="wrap_content"  />
    
     &lt/LinearLayout>
    
    





    
    
    // white
    
     <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:background="#ffffffff"
        android:gravity="right"
        android:layout_height="match_parent">
    
        &ltTextView
            android:id="@+id/text"
            android:textColor="@android:color/black"
            android:layout_width="wrap_content"
            android:layout_gravity="center"
            android:textSize="28sp"
            android:layout_height="wrap_content"   />
    
     &lt/LinearLayout>
    
    





    
    
    // black
    
     <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:background="#ff000000"
        android:layout_height="match_parent">
    
        &ltTextView
            android:id="@+id/text"
            android:textColor="@android:color/white"
            android:layout_width="wrap_content"
            android:layout_gravity="center"
            android:textSize="33sp"
            android:layout_height="wrap_content"   />
    
     &lt/LinearLayout>
    
    





Then, we create the listview item. In our case, with a string and a type. 


    
    
    public class ListViewItem {
            private String text;
            private int type;
    
            public ListViewItem(String text, int type) {
                this.text = text;
                this.type = type;
            }
    
            public String getText() {
                return text;
            }
    
            public void setText(String text) {
                this.text = text;
            }
    
            public int getType() {
                return type;
            }
    
            public void setType(int type) {
                this.type = type;
            }
    
        }
    
    



After that, we create a view holder. It's strongly recommended because Android OS keeps the layout reference to reuse your item when it disappears and appears back on the screen. If you don't use this approach, every single time that your item appears on the screen Android OS will create a new one and causing your app to leak memory. 


    
    
    public class ViewHolder {
            TextView text;
    
            public ViewHolder(TextView text) {
                this.text = text;
            }
    
            public TextView getText() {
                return text;
            }
    
            public void setText(TextView text) {
                this.text = text;
            }
    
        }
    
    






Finally, we create our custom adapter overriding getViewTypeCount() and getItemViewType(int position). 


    
    
    public class CustomAdapter extends ArrayAdapter {
    
            public static final int TYPE_ODD = 0;
            public static final int TYPE_EVEN = 1;
            public static final int TYPE_WHITE = 2;
            public static final int TYPE_BLACK = 3;
    
            private ListViewItem[] objects;
    
            @Override
            public int getViewTypeCount() {
                return 4;
            }
    
            @Override
            public int getItemViewType(int position) {
                return objects[position].getType();
            }
    
            public CustomAdapter(Context context, int resource, ListViewItem[] objects) {
                super(context, resource, objects);
                this.objects = objects;
            }
    
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
    
                ViewHolder viewHolder = null;
                ListViewItem listViewItem = objects[position];
                int listViewItemType = getItemViewType(position);
    
    
                if (convertView == null) {
    
                    if (listViewItemType == TYPE_EVEN) {
                        convertView = LayoutInflater.from(getContext()).inflate(R.layout.type_even, null);
                    } else if (listViewItemType == TYPE_ODD) {
                        convertView = LayoutInflater.from(getContext()).inflate(R.layout.type_odd, null);
                    } else if (listViewItemType == TYPE_WHITE) {
                        convertView = LayoutInflater.from(getContext()).inflate(R.layout.type_white, null);
                    } else {
                        convertView = LayoutInflater.from(getContext()).inflate(R.layout.type_black, null);
                    }
    
                    TextView textView = (TextView) convertView.findViewById(R.id.text);
                    viewHolder = new ViewHolder(textView);
    
                    convertView.setTag(viewHolder);
    
                } else {
                    viewHolder = (ViewHolder) convertView.getTag();
                }
    
                viewHolder.getText().setText(listViewItem.getText());
    
                return convertView;
            }
    
        }
    
    





And our activity is something like this: 


    
    
    public class MainActivity extends ActionBarActivity {
    
        private ListView listView;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
    
            setContentView(R.layout.activity_main); // here, you can create a single layout with a listview
    
            listView = (ListView) findViewById(R.id.listview);
    
            final ListViewItem[] items = new ListViewItem[40];
    
            for (int i = 0; i < items.length; i++) {
                if (i == 4) {
                    items[i] = new ListViewItem("White " + i, CustomAdapter.TYPE_WHITE);
                } else if (i == 9) {
                    items[i] = new ListViewItem("Black " + i, CustomAdapter.TYPE_BLACK);
                } else if (i % 2 == 0) {
                    items[i] = new ListViewItem("EVEN " + i, CustomAdapter.TYPE_EVEN);
                } else {
                    items[i] = new ListViewItem("ODD " + i, CustomAdapter.TYPE_ODD);
                }
            }
    
            CustomAdapter customAdapter = new CustomAdapter(this, R.id.text, items);
            listView.setAdapter(customAdapter);
            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView adapterView, View view, int i, long l) {
                    Toast.makeText(getBaseContext(), items[i].getText(), Toast.LENGTH_SHORT).show();
                }
            });
    
        }
    }
    
    





See it on operation.







![](http://i.imgur.com/pb1jDHY.gif)






That's it!
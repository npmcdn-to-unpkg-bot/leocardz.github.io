[![](https://img.shields.io/badge/platform-iOS%20%7C%20macOS%20%7C%20watchOS%20%7C%20tvOS-orange.svg)][0]
[![](https://img.shields.io/badge/pod-v0.1.5-red.svg)][1]
[![](https://img.shields.io/badge/Carthage-compatible-4BC51D.svg)][2]
[![](https://img.shields.io/badge/SPM-compatible-orange.svg)][3]
[![](https://travis-ci.org/LeonardoCardoso/SwiftLinkPreview.svg?branch=master)][4]

I gotta confess that I got obsessed on trying to port my first [Link Preview][5] project to other platforms. I made it! [First to Android][6], then a [reboot][7] using newer technologies and now it's on Swift! That's right!

Swift is a great programming language that allows us to learn faster and build more stuff in less time because of its simplicity.

Back then when I created my first project related to previewing link only Facebook used this feature on their services. Now many companies preview links inside their products. But none of them has open-sourced it.

It basically does the same thing as the others. It makes a preview from an URL, grabbing all the information such as title, relevant texts and images.

![](http://i.imgur.com/pl0obMz.gif)

![](http://i.imgur.com/qns1s4x.gif)

![](http://i.imgur.com/tZ2ymnX.gif)

![](http://i.imgur.com/uz55zDu.gif)

### Requirements and Details

* iOS 8.0+ / macOS 10.9+ / tvOS 9.0+ / watchOS 2.0+
* Xcode 7.3 or above
* Built with Swift 2.2.1

---

### Installation 

### CocoaPods

To use **SwiftLinkPreview** as a pod package just add the following in your 

Podfile file.

    
    source 'https://github.com/CocoaPods/Specs.git'
    platform :ios, '8.0'
    
    target 'Your Project Name' do
        use_frameworks!
        // ...
        pod 'SwiftLinkPreview', '~> 0.1.5'
        // ...
    end
    

### Carthage

To use **SwiftLinkPreview** as a Carthage module package just add the following in your **Cartfile** file.

    
    // ...
    github "LeonardoCardoso/SwiftLinkPreview" ~> 0.1.5
    // ...

### Swift Package Manager

To use **SwiftLinkPreview** as a Swift Package Manager package just add the following in your **Package.swift** file.

    
    import PackageDescription
    
    let package = Package(
      name: "Your Target Name",
      dependencies: [
        .Package(url: "https://github.com/LeonardoCardoso/SwiftLinkPreview.git", majorVersion: 0)
      ]
    )
    

### Manually 

You just need to drop SwiftLinkPreview folder into Xcode project (make sure to enable "Copy items if needed" and "Create groups").

---

### Usage

### Instatiating 
    
    
    import SwiftLinkPreview
    
    // ...
    
    let slp = SwiftLinkPreview()
    

### Requesting preview 
    
    
    slp.preview(
        "Text containing URL",
        onSuccess: { result in
        	
    		print("\(result)")
            
        },
        onError: { error in
           
    		print("\(error)")
            
        }
    )
    

**result** is a dictionary **\[String: AnyObject\]** like:

    
    [
       "url": "original URL", 								// NSURL
       "finalUrl": "final ~unshortened~ URL.", 				// NSURL
       "canonicalUrl": "canonical URL", 						// NSURL
       "title": "title", 									// String
       "description": "page description or relevant text", 	// String
       "images": ["array of URLs of the images"], 			// String array
       "image": "main image" 								// String
    ]
    

### Cancelling a request 
    
    
    slp.cancel()
    

### Flow

![](http://i.imgur.com/SMueQkA.png)

### Important 

You need to set **Allow Arbitrary Loads** to **YES** on your project's Info.plist file.

![](http://i.imgur.com/41hGjCC.png)

### License 
    
    
    
    The MIT License (MIT)
    
    Copyright (c) 2016 Leonardo Cardoso
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    



[0]: https://github.com/LeonardoCardoso/SwiftLinkPreview#requirements-and-details
[1]: https://github.com/LeonardoCardoso/SwiftLinkPreview#cocoapods
[2]: https://github.com/LeonardoCardoso/SwiftLinkPreview#carthage
[3]: https://github.com/LeonardoCardoso/SwiftLinkPreview#swift-package-manager
[4]: https://travis-ci.org/LeonardoCardoso/SwiftLinkPreview
[5]: http://lab.leocardz.com/facebook-link-preview-php--jquery/
[6]: http://android.leocardz.com/android-link-preview/
[7]: http://lab.leocardz.com/link-preview/
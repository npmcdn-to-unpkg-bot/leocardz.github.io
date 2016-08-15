"use strict";function getProperRoutes(){return[{path:"",component:home_component_1.HomeComponent},{path:"android",component:android_component_1.AndroidComponent},{path:"android/:post",component:android_component_1.AndroidComponent},{path:"blog",component:blog_component_1.BlogComponent},{path:"blog/:post",component:blog_component_1.BlogComponent},{path:"ios",component:ios_component_1.IOSComponent},{path:"ios/:post",component:ios_component_1.IOSComponent},{path:"lab",component:lab_component_1.LabComponent},{path:"lab/:post",component:lab_component_1.LabComponent},{path:"about",component:about_component_1.AboutComponent},{path:"open-source",component:open_source_component_1.OpenSourceComponent},{path:"privacy",component:privacy_component_1.PrivacyComponent},{path:"tag/:tag",component:tag_component_1.TagComponent},{path:"**",component:not_found_component_1.NotFoundComponent}]}var router_1=require("@angular/router"),home_component_1=require("./components/home.component"),android_component_1=require("./components/android.component"),blog_component_1=require("./components/blog.component"),ios_component_1=require("./components/ios.component"),lab_component_1=require("./components/lab.component"),about_component_1=require("./components/about.component"),open_source_component_1=require("./components/open.source.component"),privacy_component_1=require("./components/privacy.component"),tag_component_1=require("./components/tag.component"),not_found_component_1=require("./components/not.found.component");exports.APP_ROUTE_PROVIDERS=[router_1.provideRouter(getProperRoutes())];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5yb3V0ZXMuanMiXSwibmFtZXMiOlsiZ2V0UHJvcGVyUm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsImhvbWVfY29tcG9uZW50XzEiLCJIb21lQ29tcG9uZW50IiwiYW5kcm9pZF9jb21wb25lbnRfMSIsIkFuZHJvaWRDb21wb25lbnQiLCJibG9nX2NvbXBvbmVudF8xIiwiQmxvZ0NvbXBvbmVudCIsImlvc19jb21wb25lbnRfMSIsIklPU0NvbXBvbmVudCIsImxhYl9jb21wb25lbnRfMSIsIkxhYkNvbXBvbmVudCIsImFib3V0X2NvbXBvbmVudF8xIiwiQWJvdXRDb21wb25lbnQiLCJvcGVuX3NvdXJjZV9jb21wb25lbnRfMSIsIk9wZW5Tb3VyY2VDb21wb25lbnQiLCJwcml2YWN5X2NvbXBvbmVudF8xIiwiUHJpdmFjeUNvbXBvbmVudCIsInRhZ19jb21wb25lbnRfMSIsIlRhZ0NvbXBvbmVudCIsIm5vdF9mb3VuZF9jb21wb25lbnRfMSIsIk5vdEZvdW5kQ29tcG9uZW50Iiwicm91dGVyXzEiLCJyZXF1aXJlIiwiZXhwb3J0cyIsIkFQUF9ST1VURV9QUk9WSURFUlMiLCJwcm92aWRlUm91dGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxZQVlBLFNBQVNBLG1CQUNMLFFBQ01DLEtBQU0sR0FBSUMsVUFBV0MsaUJBQWlCQyxnQkFDdENILEtBQU0sVUFBV0MsVUFBV0csb0JBQW9CQyxtQkFDaERMLEtBQU0sZ0JBQWlCQyxVQUFXRyxvQkFBb0JDLG1CQUN0REwsS0FBTSxPQUFRQyxVQUFXSyxpQkFBaUJDLGdCQUMxQ1AsS0FBTSxhQUFjQyxVQUFXSyxpQkFBaUJDLGdCQUNoRFAsS0FBTSxNQUFPQyxVQUFXTyxnQkFBZ0JDLGVBQ3hDVCxLQUFNLFlBQWFDLFVBQVdPLGdCQUFnQkMsZUFDOUNULEtBQU0sTUFBT0MsVUFBV1MsZ0JBQWdCQyxlQUN4Q1gsS0FBTSxZQUFhQyxVQUFXUyxnQkFBZ0JDLGVBQzlDWCxLQUFNLFFBQVNDLFVBQVdXLGtCQUFrQkMsaUJBQzVDYixLQUFNLGNBQWVDLFVBQVdhLHdCQUF3QkMsc0JBQ3hEZixLQUFNLFVBQVdDLFVBQVdlLG9CQUFvQkMsbUJBQ2hEakIsS0FBTSxXQUFZQyxVQUFXaUIsZ0JBQWdCQyxlQUM3Q25CLEtBQU0sS0FBTUMsVUFBV21CLHNCQUFzQkMsb0JBMUJ2RCxHQUFJQyxVQUFXQyxRQUFRLG1CQUNuQnJCLGlCQUFtQnFCLFFBQVEsK0JBQzNCbkIsb0JBQXNCbUIsUUFBUSxrQ0FDOUJqQixpQkFBbUJpQixRQUFRLCtCQUMzQmYsZ0JBQWtCZSxRQUFRLDhCQUMxQmIsZ0JBQWtCYSxRQUFRLDhCQUMxQlgsa0JBQW9CVyxRQUFRLGdDQUM1QlQsd0JBQTBCUyxRQUFRLHNDQUNsQ1Asb0JBQXNCTyxRQUFRLGtDQUM5QkwsZ0JBQWtCSyxRQUFRLDhCQUMxQkgsc0JBQXdCRyxRQUFRLG1DQW1CcENDLFNBQVFDLHFCQUNKSCxTQUFTSSxjQUFjM0IiLCJmaWxlIjoiYXBwLnJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIHJvdXRlcl8xID0gcmVxdWlyZSgnQGFuZ3VsYXIvcm91dGVyJyk7XG52YXIgaG9tZV9jb21wb25lbnRfMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ob21lLmNvbXBvbmVudCcpO1xudmFyIGFuZHJvaWRfY29tcG9uZW50XzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYW5kcm9pZC5jb21wb25lbnQnKTtcbnZhciBibG9nX2NvbXBvbmVudF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Jsb2cuY29tcG9uZW50Jyk7XG52YXIgaW9zX2NvbXBvbmVudF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2lvcy5jb21wb25lbnQnKTtcbnZhciBsYWJfY29tcG9uZW50XzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbGFiLmNvbXBvbmVudCcpO1xudmFyIGFib3V0X2NvbXBvbmVudF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Fib3V0LmNvbXBvbmVudCcpO1xudmFyIG9wZW5fc291cmNlX2NvbXBvbmVudF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL29wZW4uc291cmNlLmNvbXBvbmVudCcpO1xudmFyIHByaXZhY3lfY29tcG9uZW50XzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJpdmFjeS5jb21wb25lbnQnKTtcbnZhciB0YWdfY29tcG9uZW50XzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdGFnLmNvbXBvbmVudCcpO1xudmFyIG5vdF9mb3VuZF9jb21wb25lbnRfMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9ub3QuZm91bmQuY29tcG9uZW50Jyk7XG5mdW5jdGlvbiBnZXRQcm9wZXJSb3V0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBob21lX2NvbXBvbmVudF8xLkhvbWVDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnYW5kcm9pZCcsIGNvbXBvbmVudDogYW5kcm9pZF9jb21wb25lbnRfMS5BbmRyb2lkQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJ2FuZHJvaWQvOnBvc3QnLCBjb21wb25lbnQ6IGFuZHJvaWRfY29tcG9uZW50XzEuQW5kcm9pZENvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdibG9nJywgY29tcG9uZW50OiBibG9nX2NvbXBvbmVudF8xLkJsb2dDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnYmxvZy86cG9zdCcsIGNvbXBvbmVudDogYmxvZ19jb21wb25lbnRfMS5CbG9nQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJ2lvcycsIGNvbXBvbmVudDogaW9zX2NvbXBvbmVudF8xLklPU0NvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdpb3MvOnBvc3QnLCBjb21wb25lbnQ6IGlvc19jb21wb25lbnRfMS5JT1NDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnbGFiJywgY29tcG9uZW50OiBsYWJfY29tcG9uZW50XzEuTGFiQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJ2xhYi86cG9zdCcsIGNvbXBvbmVudDogbGFiX2NvbXBvbmVudF8xLkxhYkNvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICdhYm91dCcsIGNvbXBvbmVudDogYWJvdXRfY29tcG9uZW50XzEuQWJvdXRDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnb3Blbi1zb3VyY2UnLCBjb21wb25lbnQ6IG9wZW5fc291cmNlX2NvbXBvbmVudF8xLk9wZW5Tb3VyY2VDb21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAncHJpdmFjeScsIGNvbXBvbmVudDogcHJpdmFjeV9jb21wb25lbnRfMS5Qcml2YWN5Q29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJ3RhZy86dGFnJywgY29tcG9uZW50OiB0YWdfY29tcG9uZW50XzEuVGFnQ29tcG9uZW50IH0sXG4gICAgICAgIHsgcGF0aDogJyoqJywgY29tcG9uZW50OiBub3RfZm91bmRfY29tcG9uZW50XzEuTm90Rm91bmRDb21wb25lbnQgfVxuICAgIF07XG59XG5leHBvcnRzLkFQUF9ST1VURV9QUk9WSURFUlMgPSBbXG4gICAgcm91dGVyXzEucHJvdmlkZVJvdXRlcihnZXRQcm9wZXJSb3V0ZXMoKSlcbl07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

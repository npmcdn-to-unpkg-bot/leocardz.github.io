"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(a=(n<3?i(a):n>3?i(t,r,a):i(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},router_1=require("@angular/router"),core_1=require("@angular/core"),http_1=require("@angular/http"),index_service_1=require("../services/index.service"),meta_service_1=require("../services/meta.service"),IOSComponent=function(){function e(e,t,r,o){var i=this;this._metaService=e,this._router=t,this._route=r,this._indexService=o;var n=this._route.snapshot.params;void 0!==n.post?o.getPost("ios",n.post).subscribe(function(t){var r=t[0],o=t[1];console.log(r),console.log(o._body),e.setData({title:r.title,description:r.content,image:"/ios/"+r.path+"/"+r.image,url:"/ios/"+r.path})},function(e){return i._router.navigate(["/not-found"])}):(e.setData({title:"iOS",url:"/ios"}),o.after=function(){o.filter(function(e){console.log(e.length)},"ios")})}return e.prototype.ngOnInit=function(){},e=__decorate([core_1.Component({moduleId:module.id,selector:"ios",templateUrl:"dist/app/views/ios.component.html",providers:[index_service_1.IndexService,http_1.HTTP_PROVIDERS]}),__metadata("design:paramtypes",[meta_service_1.MetaService,router_1.Router,router_1.ActivatedRoute,index_service_1.IndexService])],e)}();exports.IOSComponent=IOSComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaW9zLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwidGhpcyIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiZCIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19tZXRhZGF0YSIsImsiLCJ2IiwibWV0YWRhdGEiLCJyb3V0ZXJfMSIsInJlcXVpcmUiLCJjb3JlXzEiLCJodHRwXzEiLCJpbmRleF9zZXJ2aWNlXzEiLCJtZXRhX3NlcnZpY2VfMSIsIklPU0NvbXBvbmVudCIsIl9tZXRhU2VydmljZSIsIl9yb3V0ZXIiLCJfcm91dGUiLCJfaW5kZXhTZXJ2aWNlIiwiX3RoaXMiLCJwYXJhbXMiLCJzbmFwc2hvdCIsInVuZGVmaW5lZCIsImdldFBvc3QiLCJzdWJzY3JpYmUiLCJkYXRhIiwicmVzIiwibWFya2Rvd24iLCJjb25zb2xlIiwibG9nIiwiX2JvZHkiLCJzZXREYXRhIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImNvbnRlbnQiLCJpbWFnZSIsInBhdGgiLCJ1cmwiLCJlcnJvciIsIm5hdmlnYXRlIiwiYWZ0ZXIiLCJmaWx0ZXIiLCJwcm90b3R5cGUiLCJuZ09uSW5pdCIsIkNvbXBvbmVudCIsIm1vZHVsZUlkIiwibW9kdWxlIiwiaWQiLCJzZWxlY3RvciIsInRlbXBsYXRlVXJsIiwicHJvdmlkZXJzIiwiSW5kZXhTZXJ2aWNlIiwiSFRUUF9QUk9WSURFUlMiLCJNZXRhU2VydmljZSIsIlJvdXRlciIsIkFjdGl2YXRlZFJvdXRlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFDQSxJQUFJQSxZQUFjQyxNQUFRQSxLQUFLRCxZQUFlLFNBQVVFLEVBQVlDLEVBQVFDLEVBQUtDLEdBQzdFLEdBQTJIQyxHQUF2SEMsRUFBSUMsVUFBVUMsT0FBUUMsRUFBSUgsRUFBSSxFQUFJSixFQUFrQixPQUFURSxFQUFnQkEsRUFBT00sT0FBT0MseUJBQXlCVCxFQUFRQyxHQUFPQyxDQUNySCxJQUF1QixnQkFBWlEsVUFBb0Qsa0JBQXJCQSxTQUFRQyxTQUF5QkosRUFBSUcsUUFBUUMsU0FBU1osRUFBWUMsRUFBUUMsRUFBS0MsT0FDcEgsS0FBSyxHQUFJVSxHQUFJYixFQUFXTyxPQUFTLEVBQUdNLEdBQUssRUFBR0EsS0FBU1QsRUFBSUosRUFBV2EsTUFBSUwsR0FBS0gsRUFBSSxFQUFJRCxFQUFFSSxHQUFLSCxFQUFJLEVBQUlELEVBQUVILEVBQVFDLEVBQUtNLEdBQUtKLEVBQUVILEVBQVFDLEtBQVNNLEVBQ2hKLE9BQU9ILEdBQUksR0FBS0csR0FBS0MsT0FBT0ssZUFBZWIsRUFBUUMsRUFBS00sR0FBSUEsR0FFNURPLFdBQWNoQixNQUFRQSxLQUFLZ0IsWUFBZSxTQUFVQyxFQUFHQyxHQUN2RCxHQUF1QixnQkFBWk4sVUFBb0Qsa0JBQXJCQSxTQUFRTyxTQUF5QixNQUFPUCxTQUFRTyxTQUFTRixFQUFHQyxJQUV0R0UsU0FBV0MsUUFBUSxtQkFDbkJDLE9BQVNELFFBQVEsaUJBQ2pCRSxPQUFTRixRQUFRLGlCQUNqQkcsZ0JBQWtCSCxRQUFRLDZCQUMxQkksZUFBaUJKLFFBQVEsNEJBQ3pCSyxhQUFnQixXQUNoQixRQUFTQSxHQUFhQyxFQUFjQyxFQUFTQyxFQUFRQyxHQUNqRCxHQUFJQyxHQUFRL0IsSUFDWkEsTUFBSzJCLGFBQWVBLEVBQ3BCM0IsS0FBSzRCLFFBQVVBLEVBQ2Y1QixLQUFLNkIsT0FBU0EsRUFDZDdCLEtBQUs4QixjQUFnQkEsQ0FDckIsSUFBSUUsR0FBU2hDLEtBQUs2QixPQUFPSSxTQUFTRCxNQUM5QkUsVUFBY0YsRUFBYSxLQUMzQkYsRUFBY0ssUUFBUSxNQUFPSCxFQUFhLE1BQ3JDSSxVQUFVLFNBQVVDLEdBQ3JCLEdBQUlDLEdBQU1ELEVBQUssR0FDWEUsRUFBV0YsRUFBSyxFQUNwQkcsU0FBUUMsSUFBSUgsR0FDWkUsUUFBUUMsSUFBSUYsRUFBU0csT0FDckJmLEVBQWFnQixTQUNUQyxNQUFPTixFQUFJTSxNQUNYQyxZQUFhUCxFQUFJUSxRQUNqQkMsTUFBTyxRQUFVVCxFQUFJVSxLQUFPLElBQU1WLEVBQUlTLE1BQ3RDRSxJQUFLLFFBQVVYLEVBQUlVLFFBRXhCLFNBQVVFLEdBQVMsTUFBT25CLEdBQU1ILFFBQVF1QixVQUFVLGtCQUdyRHhCLEVBQWFnQixTQUFVQyxNQUFPLE1BQU9LLElBQUssU0FDMUNuQixFQUFjc0IsTUFBUSxXQUNsQnRCLEVBQWN1QixPQUFPLFNBQVVmLEdBQU9FLFFBQVFDLElBQUlILEVBQUk5QixTQUFZLFNBYzlFLE1BVkFrQixHQUFhNEIsVUFBVUMsU0FBVyxhQUNsQzdCLEVBQWUzQixZQUNYdUIsT0FBT2tDLFdBQ0hDLFNBQVVDLE9BQU9DLEdBQ2pCQyxTQUFVLE1BQ1ZDLFlBQWEsb0NBQ2JDLFdBQVl0QyxnQkFBZ0J1QyxhQUFjeEMsT0FBT3lDLGtCQUVyRGhELFdBQVcscUJBQXNCUyxlQUFld0MsWUFBYTdDLFNBQVM4QyxPQUFROUMsU0FBUytDLGVBQWdCM0MsZ0JBQWdCdUMsZ0JBQ3hIckMsS0FHUDBDLFNBQVExQyxhQUFlQSIsImZpbGUiOiJjb21wb25lbnRzL2lvcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG52YXIgcm91dGVyXzEgPSByZXF1aXJlKCdAYW5ndWxhci9yb3V0ZXInKTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlJyk7XG52YXIgaHR0cF8xID0gcmVxdWlyZSgnQGFuZ3VsYXIvaHR0cCcpO1xudmFyIGluZGV4X3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL2luZGV4LnNlcnZpY2UnKTtcbnZhciBtZXRhX3NlcnZpY2VfMSA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL21ldGEuc2VydmljZScpO1xudmFyIElPU0NvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSU9TQ29tcG9uZW50KF9tZXRhU2VydmljZSwgX3JvdXRlciwgX3JvdXRlLCBfaW5kZXhTZXJ2aWNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX21ldGFTZXJ2aWNlID0gX21ldGFTZXJ2aWNlO1xuICAgICAgICB0aGlzLl9yb3V0ZXIgPSBfcm91dGVyO1xuICAgICAgICB0aGlzLl9yb3V0ZSA9IF9yb3V0ZTtcbiAgICAgICAgdGhpcy5faW5kZXhTZXJ2aWNlID0gX2luZGV4U2VydmljZTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHRoaXMuX3JvdXRlLnNuYXBzaG90LnBhcmFtcztcbiAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gcGFyYW1zW1wicG9zdFwiXSkge1xuICAgICAgICAgICAgX2luZGV4U2VydmljZS5nZXRQb3N0KFwiaW9zXCIsIHBhcmFtc1tcInBvc3RcIl0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSBkYXRhWzBdO1xuICAgICAgICAgICAgICAgIHZhciBtYXJrZG93biA9IGRhdGFbMV07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYXJrZG93bi5fYm9keSk7XG4gICAgICAgICAgICAgICAgX21ldGFTZXJ2aWNlLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcIi9pb3MvXCIgKyByZXMucGF0aCArIFwiL1wiICsgcmVzLmltYWdlLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL2lvcy9cIiArIHJlcy5wYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIF90aGlzLl9yb3V0ZXIubmF2aWdhdGUoWycvbm90LWZvdW5kJ10pOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9tZXRhU2VydmljZS5zZXREYXRhKHsgdGl0bGU6IFwiaU9TXCIsIHVybDogXCIvaW9zXCIgfSk7XG4gICAgICAgICAgICBfaW5kZXhTZXJ2aWNlLmFmdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9pbmRleFNlcnZpY2UuZmlsdGVyKGZ1bmN0aW9uIChyZXMpIHsgY29uc29sZS5sb2cocmVzLmxlbmd0aCk7IH0sIFwiaW9zXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBJT1NDb21wb25lbnQucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIElPU0NvbXBvbmVudCA9IF9fZGVjb3JhdGUoW1xuICAgICAgICBjb3JlXzEuQ29tcG9uZW50KHtcbiAgICAgICAgICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogJ2lvcycsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvYXBwL3ZpZXdzL2lvcy5jb21wb25lbnQuaHRtbCcsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtpbmRleF9zZXJ2aWNlXzEuSW5kZXhTZXJ2aWNlLCBodHRwXzEuSFRUUF9QUk9WSURFUlNdXG4gICAgICAgIH0pLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbbWV0YV9zZXJ2aWNlXzEuTWV0YVNlcnZpY2UsIHJvdXRlcl8xLlJvdXRlciwgcm91dGVyXzEuQWN0aXZhdGVkUm91dGUsIGluZGV4X3NlcnZpY2VfMS5JbmRleFNlcnZpY2VdKVxuICAgIF0sIElPU0NvbXBvbmVudCk7XG4gICAgcmV0dXJuIElPU0NvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLklPU0NvbXBvbmVudCA9IElPU0NvbXBvbmVudDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
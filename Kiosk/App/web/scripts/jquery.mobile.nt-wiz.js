///////////////////////////////////////////////////////
//   
//   jQuery Plugin to turn form into wizard.
//   Part of NetTalk by CapeSoft 
//   (c) 2010 
//
///////////////////////////////////////////////////////

// first a small plugin to get, or set, the maximum height of a collection of elements.
(function( $ ){
  $.fn.maxHeight = function(h) {
		if (arguments.length > 0){
			this.each(function() {
				$(this).height(h);
			});
			return this;
		} else {
			var max = 0;
			this.each(function() {
				max = Math.max( max, $(this).height() );
			});
			return max;
		}	
  };
})( jQuery );

///////////////////////////////////////////////////////
// now the main ntwiz plugin.
///////////////////////////////////////////////////////

(function( $, undefined ) {

$.widget( "ui.ntwiz",  $.mobile.widget, {
	options: {
	  procedure: '',
	  validateOnNext: 0,
		activeTab: 0,
		maxTab: 0,
		wizTabs: [],
		minHeight: 0,    
		popup: 0,
		saveOk: 0,
		hidePreviousButton: 0,
		disablePreviousButton: 0,
		hidden: []
	},

//------------------------------------------------------
	_create: function() {           
		var _this = this;
		this.element.addClass( "ui-widget ui-widget-content ui-corner-all" );
		if (this.options.validateOnNext == 0){	
			$('[name="wiznext_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
					_this.next();
				});
		} else {
			$('[name="wiznext_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
					_this.tryNext();
				});
		}		
		$('[name="wizprevious_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
			_this.previous();
			});
		this.element.bind("pageinit",this._pageinit());
	},

//------------------------------------------------------
	_init: function() {
	},	
//------------------------------------------------------
	_pageinit: function() {
		this.options.wizTabs = this.element.find('> div');
		this.options.maxTab=this.options.wizTabs.length-1;
		this.activeTab(this.activeTab());	
		this._setheight('a');
	},	
//------------------------------------------------------
	_setheight: function(a) {         
		return; // don't really want the footer pushed down in mobile mode.
		var wizHeight = this.element.find('> div').maxHeight();
		if (wizHeight > 0){
		  if (this.options.minHeight > wizHeight){
		    wizHeight = this.options.minHeight;
		  }      		  
		  // set them all to be the same height.
		  this.element.find('> div').maxHeight(wizHeight);	
		}  
	},	

//------------------------------------------------------
	destroy: function() {
		this.element.removeClass( "ui-widget ui-widget-content ui-corner-all" );
		$.Widget.prototype.destroy.apply( this, arguments );
	},

//------------------------------------------------------
// shortcut to // .option("activeTab", //
	activeTab: function( newValue ) { 
	this._setheight('b');
		if ( newValue === undefined ) {
			return this.options.activeTab;
		}
		this._setOption( "activeTab", newValue );
		return this;
	},

//------------------------------------------------------
	_setOption: function( key, value ) {
		switch (key){
		case "activeTab":
			$(this.options.wizTabs[this.options.activeTab]).hide();
			this.options.activeTab = value;                        
			$(this.options.wizTabs[this.options.activeTab]).show();
			this.setButtons();
			$(this.options.wizTabs[this.options.activeTab]).find(':input:enabled:visible:first').focus();
			break;
		case "maxTab":	
			this.options.maxTab = value;
			break;
		case "hideTab":
			this.options.hidden[value] = 1;
			break;
		case "unhideTab":
			this.options.hidden[value] = 0;
			break;
		case "saveOk":		
		  this.options.saveOk = value;  
		  this.setButtons();
		  break;
		} 
		$.Widget.prototype._setOption.apply( this, arguments );
	},

//------------------------------------------------------
  setButtons: function(){
		if (this.options.maxTab == 0){
			$('[name="wizprevious_btn"]').hide();
			$('[name="wiznext_btn"]').hide();
			return;
		}
		if (this.options.hidePreviousButton){
			$('[name="wizprevious_btn"]').hide();
		} else {
			if (this.activeTab() == 0 || this.options.disablePreviousButton){  
				$('[name="wizprevious_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
			}  else {          
				$('[name="wizprevious_btn"]').attr("disabled",false).removeClass('ui-state-focus ui-state-hover ui-disabled');
			}
		}	
		if (this.activeTab() == this.options.maxTab){
			$('[name="wiznext_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
		  //$('[name="save_btn"]').removeAttr("disabled").removeClass('ui-state-focus ui-state-hover ui-disabled');
		}  else {          
			$('[name="wiznext_btn"]').removeAttr("disabled").removeClass('ui-state-focus ui-state-hover ui-disabled');
		  //$('[name="save_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
		} 
		return this;
  },
//------------------------------------------------------  
  tryNext: function() {  
    var parms = '_ajax_=1&_popup_=' + this.options.popup;

		$.get(this.options.procedure + '_nexttab_' + this.options.activeTab,parms,function(data){xmlProcess(data);});
  },

//------------------------------------------------------  
  tabChanged: function (){
    var parms = '_ajax_=1&_popup_=' + this.options.popup + '&_tab_=' + this.options.activeTab;
    $.get(this.options.procedure+'_tabchanged',parms,function(data){xmlProcess(data);});
  },
//------------------------------------------------------  
  next: function() {  
		for(var n = this.activeTab()+1; n <= this.options.maxTab; n++){
			if (this.options.hidden[n] != 1){
				this.activeTab(n);
				this.tabChanged();
				break;
			} 
		}
  },
//------------------------------------------------------  
  previous: function() {  
		if (this.options.hidePreviousButton || this.options.disablePreviousButton){
			return this;
		}
		for(var n = this.activeTab()-1; n >= 0; n--){
			if (this.options.hidden[n] != 1){
				this.activeTab(n);
				this.tabChanged();
				break;
			} 
		}
		return this;
  }
//------------------------------------------------------
});

$.extend( $.ui.ntwiz, {
	version: "@VERSION"
});

})( jQuery );

///////////////////////////////////////////////////////
// end ntwiz
///////////////////////////////////////////////////////

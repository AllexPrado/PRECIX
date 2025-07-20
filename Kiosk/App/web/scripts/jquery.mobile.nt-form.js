var ntLookupKey = 113;
var mobilemode = true;

(function( $, undefined ) {

// var equates and global variables here/

var tAccordion = 1;
var tTab       = 2;
var tPlain     = 3;
var tRound     = 4;
var tTabXP     = 5;
var tNone      = 6;
var tWizard    = 7;

$.widget("ui.ntform",  $.mobile.widget, {
   // default options
        options: {
			defaultButton: '',
			tabType: 0,
			popup:0,
			parent:'',
			procedure: '',
			action: '',
			actionCancel: '',
			actionTarget: '',
			addSec: '',
			confirmDelete:0,
			confirmDeleteMessage:'Are you sure you want to delete this record?',
			yesDeleteText:'Delete',
			noDeleteText:'No',
			confirmCancel: 0,
			confirmCancelMessage:'Are you sure you want to cancel?',
			yesCancelText:'Cancel',
			noCancelText:'No',
			confirmText:'Confirm',
			actionCancelTarget: '' ,
			urlExt:'',
			dirty:0
		},
		lastChangeValue:'',
		//------------------------------------------------------
		_create: function() {
			if (this.options.urlExt==''){try{this.options.urlExt=ntdExt} catch(e){};}			
			this.ready();
			this.firstFocus();
		},
		//------------------------------------------------------
		ready: function() {
			var _this=this;
			if (this.options.popup==1){
				try{
					if ($("#popup_" + this.options.procedure + "_div").dialog("option","title")=''){
						$("#popup_" + this.options.procedure + "_div").dialog("option","title",this.options.title);
					}	
				} catch (e) {};	
			}	
			this._bindEvents(this);
		},
		//------------------------------------------------------
		_bindEvents: function(){
			var _this = this;
			$(this.element).find('input').not('.nt-locator')
				.off('keypress.ntform').on('keypress.ntform',function(e){return _this._onKeyPress(this,e);})
				.off('keydown.ntform').on('keydown.ntform',function(e){return _this._onKeyDown(this,e);})
				.off('focus.ntform').on('focus.ntform',function(e){return _this.focus(this);})
				.off('blur.ntform').on('blur.ntform',function(e){return _this.blur(this);});
			$(this.element).find('textarea').not('.nt-locator').off('blur.ntform').on('blur.ntform',function(e){return _this.blur(this);});
			$(this.element).find('[data-form="'+_this.options.procedure+'"]').each(function(i,elem){
					switch($(elem).attr('data-do')){
					case 'imm':
						$(elem).off('change.ntform').on('change.ntform',function(e){return _this.changeField(this,e);});
						$(elem).off('blur.ntform').on('blur.ntform',function(e){return _this.blurField(this,e);});
						$(elem).off('asifblur.ntform').on('asifblur.ntform',function(e){return _this.asifBlurField(this,e);});
						break;
					case 'ivs':	
						$(elem).off('input.ntform').on('input.ntform',function(e){return _this.changeField(this,e);})
						break;
					case 'onclick':	
						$(elem).off('click.ntform').on('click.ntform',function(e){return _this.changeField(this,e);});
						break;
					case 'server':
						$(elem).off('click.ntform').on('click.ntform',function(e){return _this.pressButton(this);});
						break;
					}
			});
			$(this.element).find('[data-do="save"]').off('click.ntform').on('click.ntform',function(e){return _this.saveButton(this,e);});
			$(this.element).find('[data-do="deletef"]').off('click.ntform').on('click.ntform',function(e){return _this.deleteButton(this,e);});
			$(this.element).find('[data-do="cancel"]').off('click.ntform').on('click.ntform',function(e){return _this.cancelButton(this,e);});
			$(this.element).find('[data-do="swa"]')
					.addClass('nt-right ui-state-default ui-corner-all ui-button')
					.hover(function(){
						$(this).addClass('ui-state-hover');
					}, function(){
						$(this).removeClass('ui-state-hover');
					})
					.off('click.ntform').on('click.ntform',function(e){return _this.callSecwin(this,e);});
		},
		//------------------------------------------------------
		_onKeyPress: function(elem,e) {
			switch (e.which) {
				case 13:{ // enter
					if (e.isDefaultPrevented()){
						return false;
					}	
					return(this._onEnter(elem,e));
				}
				case 9:{ // tab
					if (e.isDefaultPrevented()){
						return false;
					}	
					return(this._onTab(elem,e));									
				}
			}
		},
//------------------------------------------------------
		_onKeyDown: function(elem,e) {
			if ((e.which == 191) && (e.shiftKey == true)){
				e.which = ntLookupKey;
			}
			switch (e.which) {
				case 8:{ // explicity handle backspace on readonly fields for benefit of IE.
					if ($(elem).attr('readonly') == 'readonly'){
						return false;
					}
					break;
				}
				//case 191:  // ?
				case ntLookupKey: {// F2 by default
					$("#"+elem.id+".hasDatepicker").each(
						function(i,v){
							e.preventDefault();
							$(elem).datepicker("show");
							return false;
						}
					);
					$("#"+elem.id).next(':button').each(
						function(i,v){
							$(this).click();
							return false;
						}
					)
				}
			}
			return true;
		},
		//------------------------------------------------------
		_onEnter: function(elem,e) {
			var _this = this;
			$(this.element).find('[data-nt-default="1"]').each(function(){
				$(this).click();
				e.preventDefault();
				return false;
			})
			this.nextFocus(elem);
			return true;
		},
		//------------------------------------------------------
		_onTab: function(elem,e) {
			this.nextFocus(elem);
			return true;
		},
		//------------------------------------------------------
		blur: function(elem) {
			//console.log('FORM BLUR')
			try{
				$('#osk').ntosk('startHide');		
			} catch(e) {};	
			return this;
		},
		//------------------------------------------------------
		hideTab: function(index){
			var id='';
			switch (this.options.tabType){
			case tNone:
			case tPlain:
			case tRound:
				$('#tab_' + this.options.procedure + index + '_div').hide();
				break;
			case tWizard:
				$('#tab_' + this.options.procedure + '_div').ntwiz("option","hideTab",index);
				break;
			case tAccordion:
				$('#tab_' + this.options.procedure + '_div').find('h3').eq(index).hide();
				break;
			case tTab:
				$('#tab_' + this.options.procedure + '_div > ul').find('li').eq(index).hide();
				break;
			}
		},
		//------------------------------------------------------
		showTab: function(index){
			var id='';
			switch (this.options.tabType){
			case tNone:
			case tPlain:
			case tRound:
				$('#tab_' + this.options.procedure + index + '_div').show();
				break;
			case tWizard:
				$('#tab_' + this.options.procedure + '_div').ntwiz("option","unhideTab",index);
			case tAccordion:
				$('#tab_' + this.options.procedure + '_div').find('h3').eq(index).show();
				break;
			case tTab:
				$('#tab_' + this.options.procedure + '_div > ul').find('li').eq(index).show();
				break;
			}
		},
		//------------------------------------------------------
		firstFocus: function(){
			var e;
			var t = 4000000000;
			$(this.element).find(' :input').not('[readonly],[disabled],[type="hidden"]').each(function(){
				tx = $(this).offset().top;
				if (tx < t && tx != 0){
					e = this;
					t = tx;
				}
			})
			$(e).focus();
		},

		//------------------------------------------------------
		_calcURL : function(elem){
			var url = $(elem).attr('id');
			if (!url){
				url = $(elem).attr('name');
			} else {
				if ($(elem).attr('type') == 'radio'){
					url = url.slice(0,url.lastIndexOf('_'));
				}
			}
			var f = $(elem).attr('data-form');
			if (!f){
				f = this.options.procedure;
			}
			return f +'_' + url + '_value';
		},

		//------------------------------------------------------
		focus : function(elem,e,i){			
			//console.log('FORM FOCUS noFocus=' + $(elem).attr("data-noFocus"))
			switch (elem.type){
			case 'text':
			case 'number':
			case 'email':
			case 'url':
			case 'range':
				if ($(elem).attr("data-noFocus") == "true"){
					$(elem).attr("data-noFocus","false");
				} else {	
					//console.log('FORM calling GetFocus');
					try{
						$('#osk').ntosk('getFocus',elem);
					} catch(e) {};	
				}	
				try{
					$('#osk').ntosk('show');				
				} catch(e) {};	
			}
		},
		//------------------------------------------------------
		blurField : function(elem,e,i){
			//console.log('FORM BLURFIELD')
			this.lastChangeValue = '';
		},
		//------------------------------------------------------
		asifBlurField : function(elem,e,i){
		    //console.log('FORM ASIF BLUR')
			if ( this.getValue(elem) != this.lastChangeValue){
				this.changeField(elem,e,i);				
			}
			this.lastChangeValue = '';
			try{
				$('#osk').ntosk('startHide');
			} catch(e) {};	
			this.nextFocus(elem);
		},
		//------------------------------------------------------
		changeField : function(elem,e,i){
			var _this=this;
			var formstate=$(elem).closest('form').find('#FormState').val();
			if ($(elem).attr("data-ac") == "open"){ // dont do anything if auto-complete is open
				return this;
			}
			if ($(elem).attr("data-wait") == "true"){ // dont do anything on-screen-keyboard was clicked.
				return this;
			}
					// in most cases want to send the id first, not the name. The id is unique to the field on
					// the form, hence has a unique validate:: routine. For radios we have to tweak the id to remove
					// the unique suffix.
			var url = this._calcURL(elem);
			this.lastChangeValue = this.getValue(elem);
			$.get(url+this.options.urlExt,
				'_popup_='+this.options.popup+'&_event_=accepted&value='+this.lastChangeValue+'&_ajax_=1&_rnd_='+Math.random()+'&formstate=' + formstate+'&_parentProc_=' + this.options.parent,
				function(data){_this._onAjaxComplete(data);});
			this.options.dirty = true;
			return this;
		},

		//------------------------------------------------------
		getValue: function(elem){
			var ans ='';
			var typ = elem.type;
			var i = 0;
			if (typ == undefined){
				typ = elem[0].type;
			}
			switch (typ){
			case "radio":
				ans = $(elem).val();
				break;
			case "checkbox":
				if (elem.checked){
					ans = elem.value;
				}
				break;
			case "select-multiple":
				for(i = 0; i < elem.length; i++) {
					if(elem.options[i].selected) {
						ans = ans + ';|;' + elem.options[i].value;
					}
				}
				break;
			case "file":
				var files = elem.files;
				try {
					for (i=0;i<files.length;i++){
						ans = ans + ';|;' + files[i].name;
					}
				} catch (err){
					ans = elem.value;
				}
				break;
			case "text":
			    var id = $(elem).attr('id')+'_slider';
				if ($('#'+id).attr('id')){
					var values = $('#'+id).slider("values");
					for(i=0;i < values.length;i++){
						ans = ans + values[i] + ';';
					}					
					break;
				} // deliberatley drop down to default if it's not a slider.				
			default:
				if ($(elem).data('luv')){
					ans = $(elem).data('luv');
				} else {
					ans = elem.value; // value not encoded automatically in IE when doing an Ajax Get.
				}
			}
			// if called as a post, do not encode & and %. If called from EIP then do.
			ans = encodeURI(ans);
			ans = ans.replace(/&/g,"%26");
			ans = ans.replace(/#/g,"%23");
			ans = ans.replace(/\+/g,"%2B");
			ans = ans.replace(/%0D%0A/g,"%0A");
			ans = ans.replace(/%0D/g,"%0A");
			ans = ans.replace(/%0A/g,"%0D%0A");
			return ans;
		},
		//------------------------------------------------------
		hideMessage: function() {
			var fn = '#'+this.options.procedure;
			fn = fn.toLowerCase();
			$(fn + '_alert_div').addClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		showMessage: function(message) {
			var fn = '#'+this.options.procedure;
			fn = fn.toLowerCase();
			$(fn + '_alert_div').empty().append(message).removeClass('nt-hidden');
			return this;
		},		
		//------------------------------------------------------
		hideField: function(fieldname) {
			var fn = '#'+this.options.procedure + '_' + fieldname;
			fn = fn.toLowerCase();
			$(fn + '_prompt_div').addClass('nt-hidden');			
			$(fn + '_value_div').addClass('nt-hidden');
			$(fn + '_comment_div').addClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		showField: function(fieldname) {
			var fn = '#'+this.options.procedure + '_' + fieldname;
			fn = fn.toLowerCase();
			$(fn + '_prompt_div').removeClass('nt-hidden');
			$(fn + '_value_div').removeClass('nt-hidden');
			$(fn + '_comment_div').removeClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		disableSave: function() {
			id = $(this.element).find('[data-do="save"]').attr("id");
			try{$('#'+id).attr("disabled","disabled").button( "refresh" );} catch (e) {};
			return this;
		},
		//------------------------------------------------------
		enableSave: function() {
			id = $(this.element).find('[data-do="save"]').attr("id");
			try{$('#'+id).removeAttr("disabled").button( "refresh" );} catch (e) {};
			return this;
		},
		//------------------------------------------------------
		show: function() {
			$('#' + this.options.procedure + '_div').show();
			return this;
		},
		//------------------------------------------------------
		hide: function() {
			$('#' + this.options.procedure + '_div').hide();
			return this;
		},
		//------------------------------------------------------
		onOpen: function() {
			this.hide();
		},
        //------------------------------------------------------
		_onAjaxComplete: function(data) {
			xmlProcess(data);
			this.ready();
			return this;
		},

		//------------------------------------------------------
		setTimer : function(fld,t) {
			setTimeout("$('#"+$(this.element).attr('id')+"').ntform('server','"+this.options.procedure + '_' + fld + '_value'+"','_event_=timer');",t);
			return this;
		},
        //------------------------------------------------------
		nextFocus : function(elem) {
			var nf = $(elem).attr('data-nextfocus');
			if (nf){
				$('#'+nf).focus();
			} else {
				var fields = $(elem).parents('form:eq(0),body').find('button,input,textarea,select').not(':hidden');
				var index = fields.index(elem);
				if ( index > -1 && ( index + 1 ) < fields.length ) {
					fields.eq(index + 1).focus();
				} else {
					fields.first().focus();
				}
			}
			return this;
		},

		//------------------------------------------------------
		// want to do an ajax call from the form, but with all the form fields included.
        pressButton : function(elem){
			var _this=this;
			var urlA= this.options.procedure+'_' + $(elem).attr('name') + '_value' + ntdExt;
			var options = {
				url: urlA,
				dataType: 'xml',
				success:    function(data) {
					_this._onAjaxComplete(data);
				},
				data: {_event_:'accepted',

				value: $(elem).attr("value"),
				_ajax_:1}
			};
			try{$(elem).attr("disabled","disabled").button( "refresh" );} catch (e) {};
			this.removePlaceHolder();
			try{
				tinyMCE.triggerSave(true,true);
			} catch(e){};
			$(elem).closest("form").ajaxSubmit(options);
			this.nextFocus(elem);
			return this;
        },
        //------------------------------------------------------
        clickSave : function(){
			$(this.element).find('[data-do="save"]').click();		
        },
        //------------------------------------------------------
        saveButton : function(elem,event){
			if (this.options.popup){
				ntd.save(event);
			} else {
				if (this.options.action && this.options.action != ''){
					$(elem).closest("form").attr("action",this.options.action).attr("target",this.options.actionTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />');
				$(elem).closest("form").append('<input type="hidden" name="_refresh_" value="saved" />');
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="save_btn" />');
				$("#_webkit_").val(Math.random());
				this.removePlaceHolder();
				$(elem).closest("form").submit();
			}
        },
        //------------------------------------------------------
        deleteButton : function(elem,event){
			if (this.options.confirmDelete) {
				ntConfirm(this.options.confirmDeleteMessage,this.options.confirmText,this.options.yesDeleteText,this.options.noDeleteText,this.deletenow,elem,event,this);
			} else {
				this.deletenow(elem,event,this);
			}
        },
        //------------------------------------------------------
        deletenow : function(elem,event,_this){
			if (_this.options.popup){
				ntd.deletef(event);
			} else {
				if (_this.options.action && _this.options.action != ''){
					$(elem).closest("form").attr("action",_this.options.action).attr("target",_this.options.actionTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />');
				$(elem).closest("form").append('<input type="hidden" name="_refresh_" value="saved" />');
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="deletef_btn" />');
				$("#_webkit_").val(Math.random());
				_this.removePlaceHolder();
				$(elem).closest("form").submit();
			}    
        },		
        //------------------------------------------------------
		cancelButton : function(elem,event){
		 console.log('cb ' + this.options.confirmCancel + ' this.options.dirty')
			if (this.options.confirmCancel && this.options.dirty) {
				console.log('cb a1')
				ntConfirm(this.options.confirmCancelMessage,this.options.confirmText,this.options.yesCancelText,this.options.noCancelText,this.cancelNow,elem,event,this);
			} else {
				this.cancelNow(elem,event,this);
			}
        },		
        //------------------------------------------------------
		cancelNow : function(elem,event,_this){
			console.log('cancel now')
			if (_this.options.popup){
				ntd.cancel(event);
			} else {
				console.log('cn1')
				if (_this.options.actionCancel && _this.options.actionCancel != ''){
				  $(elem).closest("form").attr("action",_this.options.actionCancel).attr("target",_this.options.actionCancelTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />')
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="cancel_btn" />')
				$("#_webkit_").val(Math.random());
				_this.removePlaceHolder();
				$(elem).closest("form").submit();
			}
		},
        //------------------------------------------------------
        callSecwin : function(elem,event){
			ntd.push('secwinwebuseraccess','','header',1,2,null,'','','_screen_=' + this.options.addsec);
			return this;
        },

        //------------------------------------------------------
		removePlaceHolder : function (){
			$('[placeholder]').each(function(i) {
				var e = $(this);
				if (e.val() === e.attr('placeholder')){
					e.val("");
				}
			});
		},
        //------------------------------------------------------
		server : function(url) {      // send async request to server procedure
			var parms='';
			var _this=this;
			for(var d = 1; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}
			parms +=  '&_ajax_=1' + '&_parentProc_=' + this.options.parent + '&_rnd_=' + Math.random();
			$.get(url+this.options.urlExt,parms,function(data){_this._onAjaxComplete(data);});
			return this;
		},

		//------------------------------------------------------
		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
			// now do other stuff particular to this widget
		}
 });

$.extend( $.ui.ntform, {
        version: "@VERSION"
});

})( jQuery );

// ---------------------------------------------------------------------------------------
// add functionality to "checkbox" button so it has an "on" and "off" text, and icon option.
// ---------------------------------------------------------------------------------------
$.widget("ui.checkboxbutton", $.extend({}, $.ui.button.prototype, {

  _init: function(){
    var _this=this;

    this.element.data('button', this.element.data('checkboxbutton'));
    $(this.element).bind('click',function(e){ _this._clicked()});

    var i = $.ui.button.prototype._init.apply(this, arguments);
    this._clicked(); // set initial state
    return i;
  },

	refresh: function(v){
		if (v===0){
			$(this.element).removeAttr("checked");
		} else if (v===1){
			$(this.element).attr("checked","checked");
		}
		this._clicked();
		var i = $.ui.button.prototype.refresh.apply(this, arguments);
		return i;
	},
  // Override other methods here.
  _clicked: function(){
    if($(this.element).attr("checked")){
      this.options.label = this.options.trueText;
      this.options.icons.primary = this.options.trueIcon;
    } else {
      this.options.label = this.options.falseText;
      this.options.icons.primary = this.options.falseIcon;
    }
    this._resetButton();
  }

}));

$.ui.checkboxbutton.defaults = $.extend({}, $.ui.button.defaults);

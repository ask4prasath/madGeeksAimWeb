(function( $ ){

  $.fn.pad = function( options ) {
    var settings = {
      'host'              : 'http://172.19.220.122:9001',
      'baseUrl'           : '/p/',
      'showControls'      : true,
      'showChat'          : false,
      'showLineNumbers'   : false,
      'userName'          : 'unnamed',
      'useMonospaceFont'  : false,
      'noColors'          : false,
      'userColor'         : false,
      'hideQRCode'        : false,
      'alwaysShowChat'    : false,
      'width'             : 100,
      'height'            : 500,
      'border'            : 0,
      'borderStyle'       : 'solid',
      'toggleTextOn'      : 'Disable Rich-text',
      'toggleTextOff'     : 'Enable Rich-text'
    };
    
    var $self = this;
    if (!$self.length) return;
    if (!$self.attr('id')) throw new Error('No "id" attribute');
    
    var useValue = $self[0].tagName.toLowerCase() == 'textarea';
    var selfId = $self.attr('id');
    var epframeId = 'epframe'+ selfId;
    // This writes a new frame if required
    if ( !options.getContents ) {
      if ( options ) {
        $.extend( settings, options );
      }
      
      var iFrameLink = '<iframe id="'+epframeId;
          iFrameLink = iFrameLink +'" name="'+epframeId;
          iFrameLink = iFrameLink +'" src="'+settings.host+settings.baseUrl+settings.padId;
          iFrameLink = iFrameLink + '?showControls='+settings.showControls;
          iFrameLink = iFrameLink + '&showChat='+settings.showChat;
          iFrameLink = iFrameLink + '&showLineNumbers='+settings.showLineNumbers;
          iFrameLink = iFrameLink + '&useMonospaceFont='+settings.useMonospaceFont;
          iFrameLink = iFrameLink + '&userName=' + settings.userName;
          iFrameLink = iFrameLink + '&noColors=' + settings.noColors;
          iFrameLink = iFrameLink + '&userColor=' + settings.userColor;
          iFrameLink = iFrameLink + '&hideQRCode=' + settings.hideQRCode;
          iFrameLink = iFrameLink + '&alwaysShowChat=' + settings.alwaysShowChat;
          iFrameLink = iFrameLink +'" style="border:'+settings.border;
          iFrameLink = iFrameLink +'; border-style:'+settings.borderStyle;
          iFrameLink = iFrameLink +';" width="'+ '100%';//settings.width;
          iFrameLink = iFrameLink +'" height="'+ settings.height; 
          iFrameLink = iFrameLink +'"></iframe>';
      
      
      var $iFrameLink = $(iFrameLink);
      
      if (useValue) {
        var $toggleLink = $('<a href="#'+ selfId +'">'+ settings.toggleTextOn +'</a>').click(function(){
          var $this = $(this);
          $this.toggleClass('active');
          if ($this.hasClass('active')) $this.text(settings.toggleTextOff);
          $self.pad({getContents: true});
          return false;
        });
        $self
          .hide()
          .after($toggleLink)
          .after($iFrameLink)
        ;
      }
      else {      
        $self.html(iFrameLink);
      }
    }

    // This reads the etherpad contents if required
    else {
      var frameUrl = $('#'+ epframeId).attr('src').split('?')[0];
      var contentsUrl = frameUrl + "/export/html";
      var target = $('#'+ options.getContents);

      // perform an ajax call on contentsUrl and write it to the parent
      $.get(contentsUrl, function(data) {
        
        if (target.is(':input')) {
          target.val(data).show();
        }
        else {
          target.html(data);
        }
        
        $('#'+ epframeId).remove();
      });
    }
    
    
    return $self;
  };
})( jQuery );

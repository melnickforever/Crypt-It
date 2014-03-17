$(document).ready(function(){
    $(".error").hide();
    $('#input').autosize(); 

    $('#btn_crypt').click(function(){
        
        if (check_input()) {
            var pass = $.trim( $('#password').val());
            var text = $.trim( $('#input').val());
            $('#input').val( encrypt(text,pass) );
        }
    });

    $('#btn_decrypt').click(function(){
        
        if (check_input()) {
            var pass = $.trim( $('#password').val());
            var text = $.trim( $('#input').val());
            $('#input').val( decrypt(text,pass) );
        }

    });

    $('#btn_close').click(function(){
        window.close();
    });
    
    $('#btn_copy').click(function(){
        if ($.trim( $('#input').val()) != '') {
            $('#input').select();
            document.execCommand('copy');
        }
    });

    $('#paste').click(function(){
        
            $('#input').select();
            document.execCommand('paste');
    });
    
    

});


function check_input() {
    var result = false;
    if ($.trim( $('#password').val() ) == "") {
        $('#pass_error').fadeIn();
    }
    else {
        $('#pass_error').fadeOut();
        result = true;
    }
    
    if ($.trim( $('#input').val() ) == "") {
        $('#input_error').fadeIn();
    }
    else {
        $('#input_error').fadeOut();
        result = true;
    }
    
    return result;
    
    
}

//============ XOR CRYPT =================
function encrypt(s,pw)
{
 var a=0;
 var myString='';
 var textLen=s.length;
 var pwLen=pw.length;

 for (i=0;i<textLen;i++) {
    a=parseInt(s.charCodeAt(i));
    a=a^(pw.charCodeAt(i%pwLen));
    a=a+"";
    
    while (a.length<3)
        a='0'+a;
    myString+=a;
}

return myString;
}

function decrypt(s,pw){
 var myString='';
 var a=0;
 var pwLen=pw.length;
 var textLen=s.length;
 var i=0;
 var myHolder="";

 while(i<s.length-2) {
  myHolder=s.charAt(i)+s.charAt(i+1)+s.charAt(i+2);

 if (s.charAt(i)=='0') {
 myHolder=s.charAt(i+1)+s.charAt(i+2);
 }
 if ((s.charAt(i)=='0')&&(s.charAt(i+1)=='0')) {
    myHolder=s.charAt(i+2);
 }
 a=parseInt(myHolder);
 a=a^(pw.charCodeAt(i/3%pwLen));
 myString+=String.fromCharCode(a);
 i+=3;
 }//end of while i
return myString;
}
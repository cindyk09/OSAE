$(document).ready(function() {
        var scntDiv = $('#contacts');
        var i = 1;
        var a = 1;
        var o = 1;
        var osDiv = $('#os_class')

        $(document).on('click', "#contact_button",function() {
                i++;
                $('<div class="extra_contact_'+i+'"><li><p class="left"><label for="contact_name">First Name<span class="req">*</span></label><input type="text" name="first_name_'+i+'"/></p><p class="pull-right"><label for="contact_name">Last Name<span class="req">*</span></label><input type="text" name="last_name_'+i+'" /></p></li><li><p><label for="company">Email <span class="req">*</span></label><input type="email" name="email_'+i+'" /></p><p class="right"><label for="contact_name">Position<span class="req">*</span></label><input type="text" name="position_1" placeholder="Ex: Software Engineer" required/></li><hr></div>').appendTo(scntDiv);
                return false;
        });

        // $(document).on('click', '#remScnt', function() {
        //         if( i > 1 ) {
        //                 $(this).parents('div').first().remove();
        //                 i--;
        //         }
        //         return false;
        // });

        $(document).on('click', '#remScnt', function() {
                if( i > 1 ) {
                        $(this).parents('#contacts div').remove();
                        i--;
                }
                return false;
        });




            $('#remScnt').hide();
        $(document).on('click', '#contact_button', function() {
                  $('#remScnt').show();
                return false;
        });
        $(document).on('click','#os_button', function() {
                a++;
                $('<div id="os_info_'+a+'"><p><input type="text"  name="os_info_'+a+'" placeholder="OS distribution, version" /><a id="remOS"> Remove</a></p><br></div>').appendTo(osDiv);

                return false;
        });
        $(document).on('click', '#remOS', function() {
                // text_box='#os_info_'+a
                if( a > 1 ) {
                        $(this).parents(text_box).remove();
                        a--;
                }
                return false;
        });


});

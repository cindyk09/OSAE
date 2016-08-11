$(document).ready(function() {
        var scntDiv = $('#contacts');
        var i = 1;
        var a = 1;
        var osDiv = $('#os_class')
        $(document).on('click', "#contact_button",function() {
                i++;
                $('<div class="extra_contact_'+i+'"><li><p class="left"><label for="contact_name">Contact Name</label><input type="text" name="contact_name_'+i+'" placeholder="John Doe" /></p><p class="pull-right"><label for="contact_role">Contact Role</label><input type="text" name="contact_role_'+i+'" placeholder="Engineer" /></p></li><li><p><label for="company">Contact Email </label><input type="email" name="contact_email_'+i+'" placeholder="first.last@company.com" /></p></li><a id="remScnt">Remove</a></div>').appendTo(scntDiv);
                return false;
        });
        $(document).on('click', '#remScnt', function() {

                if( i > 1 ) {
                        $(this).parents('div').first().remove();
                        i--;
                }
                return false;
        });
        $(document).on('click','#os_button', function() {
                a++;
                $('<div id="os_info_'+a+'"><input type="text"  name="os_info_'+a+'" placeholder="OS distribution, version" /><a id="remOS">Remove</a><br></div>').appendTo(osDiv);

                return false;
        });
        $(document).on('click', '#remOS', function() {
                text_box='#os_info_'+a
                debugger;
                if( a > 2 ) {
                        $(this).parents(text_box).remove();
                        a--;
                }
                return false;
        });


});

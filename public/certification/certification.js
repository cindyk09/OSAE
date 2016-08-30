$(document).ready(function() {
        var scntDiv = $('#contacts');
        var i = 1;
        var a = 1;
        var o = 1;
        var osDiv = $('#osClass')

// Add more contacts
        $(document).on('click', "#contact_button",function() {
                i++;
                $('<div class="extra_contact_'+i+'"><li><p class="left"><label for="contact_name">First Name<span class="req">*</span></label><input type="text" name="first_name_'+i+'"/></p><p class="pull-right"><label for="contact_name">Last Name<span class="req">*</span></label><input type="text" name="last_name_'+i+'" /></p></li><li><p><label for="company">Email <span class="req">*</span></label><input type="email" name="email_'+i+'" /></p><p class="right"><label for="contact_name">Position<span class="req">*</span></label><input type="text" name="position_1" placeholder="Ex: Software Engineer" required/></li></div>').appendTo(scntDiv);
                return false;
        });

// remove last added contacts
        $(document).on('click', '#remScnt', function() {
                if( i > 1 ) {
                        $('scntDiv div:last').remove();
                        i--;
                }
                return false;
        });

// show remove button only when there are more than 1
        $('#remScnt').hide();

        $(document).on('click', '#contact_button', function() {
                  $('#remScnt').show();
                return false;
        });

// Add more on os version
        $(document).on('click','#os_button', function() {
                a++;
                $('<div class="os_info_'+a+'"><p><input type="text"  name="os_info_'+a+'" placeholder="OS distribution, version"/></p></div>').appendTo(osDiv);

                return false;
        });

// remove last added os
        $(document).on('click', '#remOS', function() {
                if( a > 1 ) {
                        $('#osClass div:last').remove();
                        a--;
                }
                return false;
        });

  // show remove button only when there are more than 1
          $('#remOS').hide();

          $(document).on('click', '#os_button', function() {
                    $('#remOS').show();
                  return false;
          });
});

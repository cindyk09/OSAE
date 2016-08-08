$(function() {
        var scntDiv = $('#contacts');
        var i = $('#contacts li').length() + 1;

        $('#contact_button').on('click', function() {
                $('<p><label for="p_scnts"><input type="text" id="p_scnt" size="20" name="p_scnt_' + i +'" value="" placeholder="Input Value" /></label> <a href="#" id="remScnt">Remove</a></p>').appendTo(scntDiv);
                i++;
                return false;
        });

        $('#remScnt').on('click', function() {
                if( i > 2 ) {
                        $(this).parents('p').remove();
                        i--;
                }
                return false;
        });
});

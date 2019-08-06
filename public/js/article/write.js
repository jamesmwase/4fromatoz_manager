// $Spelling.SpellCheckInWindow('.spell-check')
$(document).ready(function() {
  $('option#category-selection[value=""]');
  $('#category-selection').on('change', function() {
    if (this.value !== null) {
      $.get("/articles/write/get_tags_on/" + this.value, function(tags, status){
        var i, tagL;
        tagL = tags.length;
        $('#tag-selection-wrapper').css('display', 'block');
        $('#tag-selection').find('option').remove().prepend(`<option value="">foo</option>`);
        for (i = 0; i < tagL; i++) {
          $('#tag-selection').prepend(`<option value="` + tags[i].tag + `">` + tags[i].tag + `</option>`);
        }
        $('.article-tag-selection').select2();
      });
    }
  });
});

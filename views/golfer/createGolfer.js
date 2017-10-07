<script>
  jQuery(document).ready(function($){
    $("input[name='myFile']").change(function() { 
      var formData = new FormData('#myFile');
      //- formData.append('section', 'general');
      //- formData.append('action', 'previewImg');
      formData.append('myFile', $("input[name='myFile']")[0].files[0]);
      $.ajax({
        url : '/api/upload',
        type : 'POST',
        data : formData,
        contentType: 'multipart/form-data',
        async: true,
        cache: false,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        timeout: 60000,
        success : function(data) {
          console.log(data);
          $("#golferAvar").attr("src","/uploads/" + data.filename);
          $('input[name=avatar]').val(data.filename);
        }
      });
    })    
  });
</script>
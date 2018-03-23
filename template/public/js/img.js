const readImage = (input) => {
  if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
          $('#picture')
              .attr('src', e.target.result)
              .width(1000)
              .height(1000);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
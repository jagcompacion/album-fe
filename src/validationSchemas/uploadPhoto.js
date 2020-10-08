import * as yup from "yup";

const formats = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export default yup.object().shape({
  album: yup.string().required("required").nullable(),
  file: yup
    .mixed()
    .test("required", "required", (value) => !!value.name)
    .test("fileType", "Unsupported File Format", (value) =>
      formats.includes(value.type)
    ),
});

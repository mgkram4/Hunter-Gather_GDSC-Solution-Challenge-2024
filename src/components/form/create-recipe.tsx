import { Form, Formik } from "formik";
import * as Yup from "yup";
import Textarea from "../input/textarea";
import Input from "../input/input";
import Slider from "../input/slider";
import Button, { BUTTON_VARIANTS } from "../button/button";
import RecipeImgUpload from "../input/recipe-image";

const initialValues = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  sweetness: 1,
  sourness: 1,
  bitterness: 1,
  saltiness: 1,
  spiciness: 1,
  savoriness: 1,
  //images: [""]
};

export type RecipeSchema = typeof initialValues;

const recipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  ingredients: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  instructions: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  sweetness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  sourness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  bitterness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  saltiness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  spiciness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  savoriness: Yup.number()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  /*images: Yup.array()
    .min(1, "Need Image!")
    .max(4, "Too Many!")
    .required("Required")*/
});

interface CreateRecipeFormProps {
  handleSubmit: (values: RecipeSchema) => void;
}

export default function CreateRecipeForm({
  handleSubmit,
}: CreateRecipeFormProps) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        validate={(values) => {}}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <Input
              labelClassName={"text-3xl font-bold"}
              label={"Title"}
              name="title"
              error={errors.title && touched.title ? errors.title : null}
            />
            <Input
              labelClassName={"text-3xl font-bold mt-2"}
              label={"Description"}
              name="description"
              error={
                errors.description && touched.description
                  ? errors.description
                  : null
              }
            />
            <Textarea
              labelClassName={"text-3xl font-bold mt-2"}
              label={"Ingredients"}
              className={"min-h-[200px]"}
              name="ingredients"
              setFieldValue={setFieldValue}
              error={
                errors.ingredients && touched.ingredients
                  ? errors.ingredients
                  : null
              }
            />
            <Slider
              label={"Sweetness"}
              name={"sweetness"}
              setFieldValue={setFieldValue}
              range={10}
              error={
                errors.sweetness && touched.sweetness ? errors.sweetness : null
              }
            />
            {errors.sweetness && touched.sweetness && (
              <span>{errors.sweetness}</span>
            )}
            <Slider
              label={"Sourness"}
              name={"sourness"}
              range={10}
              setFieldValue={setFieldValue}
              error={
                errors.sourness && touched.sourness ? errors.sourness : null
              }
            />
            <Slider
              label={"Bitterness"}
              name={"bitterness"}
              range={10}
              setFieldValue={setFieldValue}
              error={
                errors.bitterness && touched.bitterness
                  ? errors.bitterness
                  : null
              }
            />
            <Slider
              label={"Saltiness"}
              name={"saltiness"}
              range={10}
              setFieldValue={setFieldValue}
              error={
                errors.saltiness && touched.saltiness ? errors.saltiness : null
              }
            />
            {errors.saltiness && touched.saltiness && (
              <span>{errors.saltiness}</span>
            )}
            <Slider
              label={"Spiciness"}
              name={"spiciness"}
              range={10}
              setFieldValue={setFieldValue}
              error={
                errors.spiciness && touched.spiciness ? errors.spiciness : null
              }
            />
            <Slider
              label={"Savoriness"}
              name={"savoriness"}
              range={10}
              setFieldValue={setFieldValue}
              error={
                errors.savoriness && touched.savoriness
                  ? errors.savoriness
                  : null
              }
            />
            <Textarea
              labelClassName={"text-3xl font-bold mt-2"}
              label={"Instructions"}
              className={"min-h-[200px]"}
              name="instructions"
              showPreview
              setFieldValue={setFieldValue}
              error={
                errors.instructions && touched.instructions
                  ? errors.instructions
                  : null
              }
            />

            {/*<RecipeImgUpload supabase={} recipe_id={}/>*/}

            <Button
              type={"submit"}
              varient={BUTTON_VARIANTS.PRIMARY}
              className={"w-1/4"}
              disabled={isSubmitting}
            >
              Create Recipe
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

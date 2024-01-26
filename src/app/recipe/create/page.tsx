"use client";
import Button, { BUTTON_VARIANTS } from "@/src/components/button/button";
import Input from "@/src/components/input/input";
import Slider from "@/src/components/input/slider";
import Textarea from "@/src/components/input/textarea";
import { useAuth } from "@/src/utils/hooks/auth-hook";
import { createClient } from "@/src/utils/supabase/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";

export default function CreateRecipe() {
  const supabase = createClient();
  const router = useRouter();

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
  });

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
  };

  type Recipie = typeof initialValues;

  const handleSubmit = async (values: Recipie) => {};

  useEffect(() => {
    async () => {
      await useAuth(router);
    };
  }, []);
  return (
    <div className={"flex flex-col h-full mt-10 mx-[12%]"}>
      <h1 className={"text-center text-5xl"}>Create Your Masterpiece</h1>
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
    </div>
  );
}

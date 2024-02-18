export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string;
          id: number;
          recipe_ids: number[] | null;
          updated_at: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          recipe_ids?: number[] | null;
          updated_at?: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          recipe_ids?: number[] | null;
          updated_at?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Bookmarks_userId_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          recipe_id: number;
          updated_at: string;
          user_id: number;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          recipe_id: number;
          updated_at?: string;
          user_id: number;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          recipe_id?: number;
          updated_at?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Comments_recipeId_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comments_userId_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ingredients: {
        Row: {
          created_at: string;
          id: number;
          items: Json;
          recipe_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          items?: Json;
          recipe_id: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          items?: Json;
          recipe_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Ingredients_recipeId_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      ratings: {
        Row: {
          created_at: string;
          id: number;
          rating: number;
          recipe_id: number;
          updated_at: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          rating: number;
          recipe_id: number;
          updated_at?: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          rating?: number;
          recipe_id?: number;
          updated_at?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Ratings_recipeId_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Ratings_userId_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_taste_profiles: {
        Row: {
          bitterness: number;
          created_at: string;
          embeddings: string | null;
          id: number;
          recipe_id: number;
          saltiness: number;
          savoriness: number;
          sourness: number;
          spiciness: number;
          sweetness: number;
          updated_at: string;
        };
        Insert: {
          bitterness?: number;
          created_at?: string;
          embeddings?: string | null;
          id?: number;
          recipe_id: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updated_at?: string;
        };
        Update: {
          bitterness?: number;
          created_at?: string;
          embeddings?: string | null;
          id?: number;
          recipe_id?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "RecipeTasteProfiles_recipeId_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipes: {
        Row: {
          bookmark_count: number;
          comment_count: number;
          commentId: number | null;
          created_at: string;
          date_published: string;
          embeddings: string | null;
          headliner_image: string | null;
          id: number;
          ingredientsId: number | null;
          instructions: Json;
          rating_count: number;
          ratings_id: number | null;
          short_description: string;
          taste_profile_id: number | null;
          title: string;
          updated_at: string;
          user_id: number;
        };
        Insert: {
          bookmark_count?: number;
          comment_count?: number;
          commentId?: number | null;
          created_at?: string;
          date_published: string;
          embeddings?: string | null;
          headliner_image?: string | null;
          id?: number;
          ingredientsId?: number | null;
          instructions?: Json;
          rating_count?: number;
          ratings_id?: number | null;
          short_description?: string;
          taste_profile_id?: number | null;
          title: string;
          updated_at?: string;
          user_id: number;
        };
        Update: {
          bookmark_count?: number;
          comment_count?: number;
          commentId?: number | null;
          created_at?: string;
          date_published?: string;
          embeddings?: string | null;
          headliner_image?: string | null;
          id?: number;
          ingredientsId?: number | null;
          instructions?: Json;
          rating_count?: number;
          ratings_id?: number | null;
          short_description?: string;
          taste_profile_id?: number | null;
          title?: string;
          updated_at?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Recipes_commentId_fkey";
            columns: ["commentId"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_ingredientsId_fkey";
            columns: ["ingredientsId"];
            isOneToOne: false;
            referencedRelation: "ingredients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_tasteProfileId_fkey";
            columns: ["taste_profile_id"];
            isOneToOne: false;
            referencedRelation: "recipe_taste_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_userId_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          recipe_id: number;
          updatedAt: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          recipe_id: number;
          updatedAt?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          recipe_id?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Tags_recipeId_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      user_taste_profiles: {
        Row: {
          bitterness: number;
          created_at: string;
          embeddings: string | null;
          id: number;
          saltiness: number;
          savoriness: number;
          sourness: number;
          spiciness: number;
          sweetness: number;
          updated_at: string;
          user_id: number;
        };
        Insert: {
          bitterness?: number;
          created_at?: string;
          embeddings?: string | null;
          id?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updated_at?: string;
          user_id: number;
        };
        Update: {
          bitterness?: number;
          created_at?: string;
          embeddings?: string | null;
          id?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updated_at?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "UserTasteProfiles_userId_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          authMethod: Database["public"]["Enums"]["auth_method_enum"];
          created_at: string;
          email: string;
          firstName: string | null;
          follower_count: number | null;
          following_count: number | null;
          id: number;
          lastName: string | null;
          profilePicture: string | null;
          recipe_count: number | null;
          taste_profile_id: number | null;
          updated_at: string;
          uuid: string;
        };
        Insert: {
          authMethod?: Database["public"]["Enums"]["auth_method_enum"];
          created_at?: string;
          email: string;
          firstName?: string | null;
          follower_count?: number | null;
          following_count?: number | null;
          id?: number;
          lastName?: string | null;
          profilePicture?: string | null;
          recipe_count?: number | null;
          taste_profile_id?: number | null;
          updated_at?: string;
          uuid: string;
        };
        Update: {
          authMethod?: Database["public"]["Enums"]["auth_method_enum"];
          created_at?: string;
          email?: string;
          firstName?: string | null;
          follower_count?: number | null;
          following_count?: number | null;
          id?: number;
          lastName?: string | null;
          profilePicture?: string | null;
          recipe_count?: number | null;
          taste_profile_id?: number | null;
          updated_at?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Users_tasteProfileId_fkey";
            columns: ["taste_profile_id"];
            isOneToOne: false;
            referencedRelation: "user_taste_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      auth_method_enum: "traditional" | "google" | "facebook" | "x";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;

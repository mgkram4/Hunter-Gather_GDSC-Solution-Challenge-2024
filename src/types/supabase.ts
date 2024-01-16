export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Bookmarks: {
        Row: {
          createdAt: string;
          id: number;
          recipeIds: number[];
          updatedAt: string;
          userId: number;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          recipeIds: number[];
          updatedAt?: string;
          userId: number;
        };
        Update: {
          createdAt?: string;
          id?: number;
          recipeIds?: number[];
          updatedAt?: string;
          userId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Bookmarks_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Comments: {
        Row: {
          comment: string;
          createdAt: string;
          id: number;
          recipeId: number;
          updatedAt: string;
          userId: number;
        };
        Insert: {
          comment: string;
          createdAt?: string;
          id?: number;
          recipeId: number;
          updatedAt?: string;
          userId: number;
        };
        Update: {
          comment?: string;
          createdAt?: string;
          id?: number;
          recipeId?: number;
          updatedAt?: string;
          userId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Comments_recipeId_fkey";
            columns: ["recipeId"];
            isOneToOne: false;
            referencedRelation: "Recipes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Comments_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Ingredients: {
        Row: {
          createdAt: string;
          id: number;
          name: string;
          quantity: string;
          recipeId: number;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          name: string;
          quantity: string;
          recipeId: number;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          name?: string;
          quantity?: string;
          recipeId?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Ingredients_recipeId_fkey";
            columns: ["recipeId"];
            isOneToOne: false;
            referencedRelation: "Recipes";
            referencedColumns: ["id"];
          }
        ];
      };
      Ratings: {
        Row: {
          createdAt: string;
          id: number;
          rating: number;
          recipeId: number;
          updatedAt: string;
          userId: number;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          rating: number;
          recipeId: number;
          updatedAt?: string;
          userId: number;
        };
        Update: {
          createdAt?: string;
          id?: number;
          rating?: number;
          recipeId?: number;
          updatedAt?: string;
          userId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Ratings_recipeId_fkey";
            columns: ["recipeId"];
            isOneToOne: false;
            referencedRelation: "Recipes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Ratings_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      Recipes: {
        Row: {
          bookmarkCount: number;
          commentCount: number;
          commentId: number | null;
          createdAt: string;
          datePublished: string;
          headlinerImage: string | null;
          id: number;
          ingredientsId: number | null;
          instructions: string;
          ratingCount: number;
          shortDescription: string | null;
          tasteProfileId: number | null;
          title: string;
          updatedAt: string;
          userId: number;
        };
        Insert: {
          bookmarkCount?: number;
          commentCount?: number;
          commentId?: number | null;
          createdAt?: string;
          datePublished: string;
          headlinerImage?: string | null;
          id?: number;
          ingredientsId?: number | null;
          instructions: string;
          ratingCount?: number;
          shortDescription?: string | null;
          tasteProfileId?: number | null;
          title: string;
          updatedAt?: string;
          userId: number;
        };
        Update: {
          bookmarkCount?: number;
          commentCount?: number;
          commentId?: number | null;
          createdAt?: string;
          datePublished?: string;
          headlinerImage?: string | null;
          id?: number;
          ingredientsId?: number | null;
          instructions?: string;
          ratingCount?: number;
          shortDescription?: string | null;
          tasteProfileId?: number | null;
          title?: string;
          updatedAt?: string;
          userId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Recipes_commentId_fkey";
            columns: ["commentId"];
            isOneToOne: false;
            referencedRelation: "Comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_ingredientsId_fkey";
            columns: ["ingredientsId"];
            isOneToOne: false;
            referencedRelation: "Ingredients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_tasteProfileId_fkey";
            columns: ["tasteProfileId"];
            isOneToOne: false;
            referencedRelation: "RecipeTasteProfiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Recipes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      RecipeTasteProfiles: {
        Row: {
          bitterness: number;
          createdAt: string;
          id: number;
          recipeId: number;
          saltiness: number;
          savoriness: number;
          sourness: number;
          spiciness: number;
          sweetness: number;
          updatedAt: string;
        };
        Insert: {
          bitterness?: number;
          createdAt?: string;
          id?: number;
          recipeId: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updatedAt?: string;
        };
        Update: {
          bitterness?: number;
          createdAt?: string;
          id?: number;
          recipeId?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "RecipeTasteProfiles_recipeId_fkey";
            columns: ["recipeId"];
            isOneToOne: false;
            referencedRelation: "Recipes";
            referencedColumns: ["id"];
          }
        ];
      };
      Tags: {
        Row: {
          createdAt: string;
          id: number;
          name: string;
          recipeId: number;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          name: string;
          recipeId: number;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          name?: string;
          recipeId?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Tags_recipeId_fkey";
            columns: ["recipeId"];
            isOneToOne: false;
            referencedRelation: "Recipes";
            referencedColumns: ["id"];
          }
        ];
      };
      Users: {
        Row: {
          authMethod: Database["public"]["Enums"]["auth_method_enum"];
          createdAt: string;
          email: string;
          firstName: string | null;
          id: number;
          lastName: string | null;
          profilePicture: string | null;
          tasteProfileId: number | null;
          updatedAt: string;
          uuid: string;
        };
        Insert: {
          authMethod?: Database["public"]["Enums"]["auth_method_enum"];
          createdAt?: string;
          email: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          profilePicture?: string | null;
          tasteProfileId?: number | null;
          updatedAt?: string;
          uuid: string;
        };
        Update: {
          authMethod?: Database["public"]["Enums"]["auth_method_enum"];
          createdAt?: string;
          email?: string;
          firstName?: string | null;
          id?: number;
          lastName?: string | null;
          profilePicture?: string | null;
          tasteProfileId?: number | null;
          updatedAt?: string;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Users_tasteProfileId_fkey";
            columns: ["tasteProfileId"];
            isOneToOne: false;
            referencedRelation: "UserTasteProfiles";
            referencedColumns: ["id"];
          }
        ];
      };
      UserTasteProfiles: {
        Row: {
          bitterness: number;
          createdAt: string;
          id: number;
          saltiness: number;
          savoriness: number;
          sourness: number;
          spiciness: number;
          sweetness: number;
          updatedAt: string;
          userId: number;
        };
        Insert: {
          bitterness?: number;
          createdAt?: string;
          id?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updatedAt?: string;
          userId: number;
        };
        Update: {
          bitterness?: number;
          createdAt?: string;
          id?: number;
          saltiness?: number;
          savoriness?: number;
          sourness?: number;
          spiciness?: number;
          sweetness?: number;
          updatedAt?: string;
          userId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "UserTasteProfiles_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
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
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
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
    : never = never
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
    : never = never
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
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

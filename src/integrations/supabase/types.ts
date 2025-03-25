export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      goals: {
        Row: {
          completed: boolean
          current_volume: number
          description: string | null
          end_date: string | null
          id: string
          payment_method_id: string | null
          start_date: string
          target_volume: number
          user_id: string | null
        }
        Insert: {
          completed?: boolean
          current_volume?: number
          description?: string | null
          end_date?: string | null
          id?: string
          payment_method_id?: string | null
          start_date?: string
          target_volume: number
          user_id?: string | null
        }
        Update: {
          completed?: boolean
          current_volume?: number
          description?: string | null
          end_date?: string | null
          id?: string
          payment_method_id?: string | null
          start_date?: string
          target_volume?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_method_stats: {
        Row: {
          id: string
          payment_method_id: string | null
          profit: number
          stat_id: string | null
          transaction_count: number
          volume: number
        }
        Insert: {
          id?: string
          payment_method_id?: string | null
          profit?: number
          stat_id?: string | null
          transaction_count?: number
          volume?: number
        }
        Update: {
          id?: string
          payment_method_id?: string | null
          profit?: number
          stat_id?: string | null
          transaction_count?: number
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "payment_method_stats_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_method_stats_stat_id_fkey"
            columns: ["stat_id"]
            isOneToOne: false
            referencedRelation: "stats"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          balance: number
          created_at: string
          currency: string
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["payment_method_type"]
          user_id: string | null
        }
        Insert: {
          balance?: number
          created_at?: string
          currency: string
          description?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["payment_method_type"]
          user_id?: string | null
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["payment_method_type"]
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          date: string
          id: string
          time_frame: Database["public"]["Enums"]["time_frame"]
          total_profit: number
          transaction_count: number
          user_id: string | null
          volume: number
        }
        Insert: {
          date?: string
          id?: string
          time_frame?: Database["public"]["Enums"]["time_frame"]
          total_profit?: number
          transaction_count?: number
          user_id?: string | null
          volume?: number
        }
        Update: {
          date?: string
          id?: string
          time_frame?: Database["public"]["Enums"]["time_frame"]
          total_profit?: number
          transaction_count?: number
          user_id?: string | null
          volume?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          date: string
          description: string | null
          destination_method_id: string | null
          fee: number
          id: string
          local_amount: number
          platform: string
          profit: number
          rate: number
          source_method_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          amount: number
          date?: string
          description?: string | null
          destination_method_id?: string | null
          fee: number
          id?: string
          local_amount: number
          platform: string
          profit: number
          rate: number
          source_method_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          amount?: number
          date?: string
          description?: string | null
          destination_method_id?: string | null
          fee?: number
          id?: string
          local_amount?: number
          platform?: string
          profit?: number
          rate?: number
          source_method_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_destination_method_id_fkey"
            columns: ["destination_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_source_method_id_fkey"
            columns: ["source_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_method_type: "bank" | "wallet" | "exchange"
      time_frame: "day" | "week" | "month" | "year"
      transaction_type: "buy" | "sell"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

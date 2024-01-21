<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class FormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('forms')->insert([
            [
                'name'=>'Form 1',
                'welcome_text'=>'Welcome to form 1',
                'description'=>'This is the form 1',
                'creation_date_time'=>'2024-01-11 00:00:00',
                'last_modified_date_time'=>'2024-01-12 00:00:00',
                'logo'=>'/uploads/logo1.png',
                'primary_color'=>'Red',
                'secondary_color'=>'Black',
                'rounded_style'=>'Yes',
                'api_url'=>'',
                'is_active'=>true,
                'is_anonymous_user_answers'=>true,
                'is_request_mandatory_initial_data'=>true,
                'public_code'=>'100',
                'user_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'Form 2',
                'welcome_text'=>'Welcome to form 2',
                'description'=>'This is the form 2',
                'creation_date_time'=>'2024-01-05 00:00:00',
                'last_modified_date_time'=>'2024-01-07 00:00:00',
                'logo'=>'/uploads/logo2.png',
                'primary_color'=>'Blue',
                'secondary_color'=>'Green',
                'rounded_style'=>'No',
                'api_url'=>'',
                'is_active'=>false,
                'is_anonymous_user_answers'=>true,
                'is_request_mandatory_initial_data'=>true,
                'public_code'=>'200',
                'user_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('question_types')->insert([
            [
                'name'=>'Type 1',
                'description'=>'Question type 1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'Type 2',
                'description'=>'Question type 2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('completer_users')->insert([
            [
                'email'=>'penatibus@outlook.couk',
                'first_name'=>'Daquan',
                'last_name'=>'Hess',
                'code'=>'1234',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'email'=>'ipsum.dolor.sit@google.org',
                'first_name'=>'Colby',
                'last_name'=>'Floyd',
                'code'=>'1111',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_instances')->insert([
            [
                'initial_date_time'=>'2024-01-09 00:00:00',
                'is_completed'=>true,
                'completed_questions'=>10,
                'final_date_time'=>'2024-01-10 00:00:00',
                'form_id'=>1,
                'completer_user_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'initial_date_time'=>'2024-01-10 00:00:00',
                'is_completed'=>true,
                'completed_questions'=>2,
                'final_date_time'=>'2024-01-11 00:00:00',
                'form_id'=>2,
                'completer_user_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_questions')->insert([
            [
                'title'=>'Question 1',
                'text'=>'How are you?',
                'order'=>1,
                'is_obligatory'=>true,
                'form_id'=>1,
                'question_type_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title'=>'Question 2',
                'text'=>'What is happening?',
                'order'=>2,
                'is_obligatory'=>true,
                'form_id'=>2,
                'question_type_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('question_options')->insert([
            [
                'order'=>1,
                'title'=>'Option 1',
                'next_question'=>2,
                'form_question_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order'=>2,
                'title'=>'Option 2',
                'next_question'=>NULL,
                'form_question_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}

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
                'logo'=>'/uploads/logo1.png',
                'primary_color'=>'Red',
                'secondary_color'=>'Black',
                'rounded_style'=>'Yes',
                'api_url'=>'',
                'status'=>'Active',
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
                'logo'=>'/uploads/logo2.png',
                'primary_color'=>'Blue',
                'secondary_color'=>'Green',
                'rounded_style'=>'No',
                'api_url'=>'',
                'status'=>'Inactive',
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
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'email'=>'ipsum.dolor.sit@google.org',
                'first_name'=>'Colby',
                'last_name'=>'Floyd',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_instances')->insert([
            [
                'date_time'=>'2024-01-09 00:00:00',
                'form_id'=>1,
                'completer_user_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'date_time'=>'2024-01-10 00:00:00',
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
                'obligatory'=>true,
                'form_id'=>1,
                'question_type_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title'=>'Question 2',
                'text'=>'What is happening?',
                'order'=>2,
                'obligatory'=>true,
                'form_id'=>2,
                'question_type_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('question_options')->insert([
            [
                'order'=>1,
                'name'=>'Option 1',
                'description'=>'This is the option 1',
                'next_question'=>2,
                'form_question_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order'=>2,
                'name'=>'Option 2',
                'description'=>'This is the option 2',
                'next_question'=>NULL,
                'form_question_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_activities')->insert([
            [
                'date_time'=>'2024-01-05 00:00:00',
                'description'=>'Activity 1',
                'completed'=>false,
                'completed_questions'=>1,
                'form_instance_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'date_time'=>'2024-01-07 00:00:00',
                'description'=>'Activity 2',
                'completed'=>true,
                'completed_questions'=>NULL,
                'form_instance_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}

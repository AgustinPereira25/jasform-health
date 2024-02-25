<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class FormsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('forms')->insert([
            [
                'name' => 'Form 1',
                'welcome_text' => 'Welcome to form 1',
                'final_text' => 'Closing the form 1',
                'description' => 'This is the form 1',
                'creation_date_time' => '2024-01-11 12:56:19',
                'last_modified_date_time' => '2024-01-12 05:44:08',
                'logo' => 'https://raw.githubusercontent.com/joasegovia9427/jasform/develop/public/medicallLogo.png?token=GHSAT0AAAAAACKZ4WRCZDLB4FQQXYVB3AZCZO2TNXA',
                'primary_color' => 'Red',
                'secondary_color' => 'Black',
                'rounded_style' => 'Yes',
                'api_url' => 'http://127.0.0.1:89/api/user_form/',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => '100',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Form 2',
                'welcome_text' => 'Welcome to form 2',
                'final_text' => 'Closing the form 2',
                'description' => 'This is the form 2',
                'creation_date_time' => '2024-01-05 03:06:51',
                'last_modified_date_time' => '2024-01-07 11:40:53',
                'logo' => 'https://raw.githubusercontent.com/joasegovia9427/jasform/develop/public/medicallLogo.png?token=GHSAT0AAAAAACKZ4WRCZDLB4FQQXYVB3AZCZO2TNXA',
                'primary_color' => 'Blue',
                'secondary_color' => 'Green',
                'rounded_style' => 'No',
                'api_url' => 'http://127.0.0.1:89/api/user_form/',
                'is_active' => false,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => '200',
                'user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('question_types')->insert([
            [
                'name' => 'Simple Text',
                'description' => 'Simple Text',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Input Field',
                'description' => 'Input Field',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Multiple Choice - Check Box',
                'description' => 'Multiple Choice - Check Box',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Single Option - Radio Button',
                'description' => 'Single Option - Radio Button',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Single Option - Drop Down Combo',
                'description' => 'Single Option - Drop Down Combo',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('completer_users')->insert([
            [
                'email' => 'penatibus@outlook.couk',
                'first_name' => 'Daquan',
                'last_name' => 'Hess',
                'code' => '1234',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'email' => 'ipsum.dolor.sit@google.org',
                'first_name' => 'Colby',
                'last_name' => 'Floyd',
                'code' => '1111',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_instances')->insert([
            [
                'initial_date_time' => '2024-01-09 01:05:32',
                'final_date_time' => '2024-01-10 05:41:22',
                'form_id' => 1,
                'completer_user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'initial_date_time' => '2024-01-10 04:11:45',
                'final_date_time' => '2024-01-11 06:10:23',
                'form_id' => 2,
                'completer_user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'initial_date_time' => '2024-01-10 00:44:10',
                'final_date_time' => '2024-01-11 02:55:05',
                'form_id' => 2,
                'completer_user_id' => NULL,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('form_questions')->insert([
            [
                'title' => 'F1-Question A',
                'text' => 'How are you?',
                'order' => 1,
                'is_mandatory' => true,
                'form_id' => 1,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question B',
                'text' => 'What is happening?',
                'order' => 2,
                'is_mandatory' => true,
                'form_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question A',
                'text' => 'What is happening??',
                'order' => 1,
                'is_mandatory' => true,
                'form_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question B',
                'text' => 'What is happening??',
                'order' => 2,
                'is_mandatory' => true,
                'form_id' => 2,
                'question_type_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question C',
                'text' => 'What is happening??',
                'order' => 3,
                'is_mandatory' => true,
                'form_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);

        DB::table('question_options')->insert([
            [
                'order' => 1,
                'title' => 'Option 1',
                'next_question' => 2,
                'form_question_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'Option 2',
                'next_question' => NULL,
                'form_question_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 1,
                'title' => 'Option 1',
                'next_question' => 2,
                'form_question_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);

        DB::table('completed_questions')->insert([
            [
                'title' => 'F1-Question A',
                'answer' => Str::random(10),
                'form_instance_id' => 1,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question B',
                'answer' => Str::random(10),
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question A',
                'answer' => Str::random(10),
                'form_instance_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question B',
                'answer' => Str::random(10),
                'form_instance_id' => 2,
                'question_type_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question C',
                'answer' => Str::random(10),
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}

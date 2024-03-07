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
                'name' => 'MediCall Cardiology Form',
                'welcome_text' => 'Welcome to Cardiology Form',
                'description' => 'This is the cardiology form for symptom monitoring.',
                'final_text' => 'All your data will be safe with us. Medicall.',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/medicallLogo.png',
                'primary_color' => '#70C8FF',
                'secondary_color' => '#6923da',
                'rounded_style' => '20',
                'api_url' => 'http://127.0.0.1:89/api/user_form/',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'QWERTY',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Form-Puppeteer',
                'welcome_text' => 'Welcome to form 2',
                'final_text' => 'Closing the form 2',
                'description' => 'This is the form 2',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/medicallLogo.png',
                'primary_color' => 'Blue',
                'secondary_color' => 'Green',
                'rounded_style' => 'No',
                'api_url' => 'http://127.0.0.1:89/api/user_form/',
                'is_active' => false,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'ASDFGH',
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
                'title' => 'Welcome to the form',
                'text' => 'Please note that this form is not intended to replace professional medical advice. The information provided is for general knowledge purposes only and does not constitute a diagnosis or treatment plan. Always consult with a healthcare professional for medical concerns.',
                'order' => 1,
                'is_mandatory' => true,
                'mapping_key' => 'f1q0',
                'form_id' => 1,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Chest Pain Question',
                'text' => 'Do you have any chest pain or discomfort?',
                'order' => 2,
                'is_mandatory' => true,
                'mapping_key' => 'f1qa',
                'form_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Breath Shortness Question',
                'text' => 'Are you experiencing shortness of breath?',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'f1qb',
                'form_id' => 1,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'High Blood Pressure Question',
                'text' => 'Have you been diagnosed with high blood pressure?',
                'order' => 4,
                'is_mandatory' => true,
                'mapping_key' => 'f1qc',
                'form_id' => 1,
                'question_type_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Family History Question',
                'text' => 'Do you have any family history of heart disease?',
                'order' => 5,
                'is_mandatory' => true,
                'mapping_key' => 'f1qd',
                'form_id' => 1,
                'question_type_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Smoking Habit Question',
                'text' => 'Do you smoke?',
                'order' => 6,
                'is_mandatory' => true,
                'mapping_key' => 'f1qe',
                'form_id' => 1,
                'question_type_id' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question A',
                'text' => 'How are you?',
                'order' => 1,
                'is_mandatory' => true,
                'mapping_key' => 'f1qa',
                'form_id' => 2,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question B',
                'text' => 'What is happening?',
                'order' => 2,
                'is_mandatory' => true,
                'mapping_key' => 'f1qb',
                'form_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question A',
                'text' => 'What is happening??',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'f2qa',
                'form_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question B',
                'text' => 'What is happening??',
                'order' => 4,
                'is_mandatory' => true,
                'mapping_key' => 'f2qb',
                'form_id' => 2,
                'question_type_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question C',
                'text' => 'What is happening??',
                'order' => 5,
                'is_mandatory' => true,
                'mapping_key' => 'f1qc',
                'form_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);

        DB::table('question_options')->insert([
            [
                'order' => 1,
                'title' => 'Yes, I been diagnosed with high blood pressure',
                'next_question' => -1,
                'form_question_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'No, I been diagnosed with high blood pressure',
                'next_question' => -1,
                'form_question_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

            [
                'order' => 1,
                'title' => 'Mother history',
                'next_question' => -1,
                'form_question_id' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'Father history',
                'next_question' => -1,
                'form_question_id' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'Grandparents history',
                'next_question' => -1,
                'form_question_id' => 5,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 1,
                'title' => 'Yes, I have smoking habit',
                'next_question' => -1,
                'form_question_id' => 6,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'No, I have not smoking habit',
                'next_question' => -1,
                'form_question_id' => 6,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

            [
                'order' => 1,
                'title' => 'Option 1',
                'next_question' => -1,
                'form_question_id' => 10,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'Option 2',
                'next_question' => -1,
                'form_question_id' => 10,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 1,
                'title' => 'Option 1',
                'next_question' => -1,
                'form_question_id' => 10,
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
                'mapping_key' => 'f1qa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question B',
                'answer' => Str::random(10),
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'mapping_key' => 'f1qb',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question A',
                'answer' => Str::random(10),
                'form_instance_id' => 2,
                'question_type_id' => 2,
                'mapping_key' => 'f2qa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F2-Question B',
                'answer' => Str::random(10),
                'form_instance_id' => 2,
                'question_type_id' => 4,
                'mapping_key' => 'f2qb',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'F1-Question C',
                'answer' => Str::random(10),
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'mapping_key' => 'f1qc',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}

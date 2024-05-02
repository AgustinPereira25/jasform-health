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
                'api_url' => 'https://medicall.jasform.com:9443/api/user_form/',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'QWERTY',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Puppeteer Interest Form',
                'welcome_text' => 'Welcome to Puppeteer Interest Form',
                'description' => 'Puppeteer: Bridging the gap between Healthcare and GenAI. Fill out this form if you are interested in our platform.',
                'final_text' => 'Thank you for your interest in Puppeteer. We will get back to you soon!',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://assets-global.website-files.com/605a6e0eb8ab63cf8b7ce3b9/635bd4d33444bf76f63388a3_7.jpg',
                'primary_color' => '#4450EA',
                'secondary_color' => '#0A77FF',
                'rounded_style' => '20',
                'api_url' => 'https://medicall.jasform.com:9443/api/user_form/',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => false,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'AXDZGH',
                'user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'MediCall Neurology Form',
                'welcome_text' => 'Welcome to Neurology Form',
                'description' => 'This is the neurology form for symptom monitoring.',
                'final_text' => 'All your data will be safe with us. Medicall.',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/medicallLogo.png',
                'primary_color' => '#70C8FF',
                'secondary_color' => '#6923da',
                'rounded_style' => '20',
                'api_url' => 'https://medicall.jasform.com:9443/api/user_form/',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'ZXCVBN',
                'user_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Employee Feedback Form',
                'welcome_text' => 'Welcome to Employee Feedback Form',
                'final_text' => 'Thank you for your feedback!',
                'description' => 'This is the internal company feedback form.',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://ingenio.org.uy/wp-content/uploads/2020/09/Captura-de-Pantalla-2021-12-10-a-las-11.13.26.png',
                'primary_color' => '#773DBD',
                'secondary_color' => '#D8EE18',
                'rounded_style' => '20',
                'api_url' => '',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'POIUYT',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Trauma Surgery Form',
                'welcome_text' => 'Welcome to Trauma Surgery Form',
                'description' => 'Form for symptom monitoring purposes',
                'final_text' => 'Your data was taken into account',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/medicallLogo.png',
                'primary_color' => '#70C8FF',
                'secondary_color' => '#6923da',
                'rounded_style' => '20',
                'api_url' => 'https://medicall.jasform.com:9443/api/user_form/',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'LMNOPQ',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Dentist Form',
                'welcome_text' => 'Welcome to Dentist form',
                'description' => 'Please fill all required fields',
                'final_text' => 'Well done!',
                'creation_date_time' => Carbon::now(),
                'last_modified_date_time' => Carbon::now(),
                'logo' => 'https://t4.ftcdn.net/jpg/03/02/68/11/360_F_302681154_9HOWdvGLtCKpfwO5B85yESszG7MfmlUl.jpg',
                'primary_color' => '#70C8FF',
                'secondary_color' => '#d9232e',
                'rounded_style' => '20',
                'api_url' => 'https://medicall.jasform.com:9443/api/user_form/',
                'html_head' => '<></>',
                'html_body' => '<></>',
                'is_active' => true,
                'is_user_responses_linked' => true,
                'is_initial_data_required' => true,
                'public_code' => 'RSTUVW',
                'user_id' => 4,
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
                'code' => '078061120',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'email' => 'ipsum.dolor.sit@google.org',
                'first_name' => 'Colby',
                'last_name' => 'Floyd',
                'code' => '152061465',
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
                'form_id' => 4,
                'completer_user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'initial_date_time' => '2024-01-10 00:44:10',
                'final_date_time' => '2024-01-11 02:55:05',
                'form_id' => 4,
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
                'title' => 'Chest Pain',
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
                'title' => 'Breath Shortness',
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
                'title' => 'High Blood Pressure',
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
                'title' => 'Family History',
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
                'title' => 'Smoking Habit',
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
                'title' => 'Interest',
                'text' => 'What aspect of our platform are you most interested in?',
                'order' => 1,
                'is_mandatory' => true,
                'mapping_key' => 'f2qa',
                'form_id' => 2,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Use Case',
                'text' => 'Could you describe a potential use case for our platform in your organization?',
                'order' => 2,
                'is_mandatory' => false,
                'mapping_key' => 'f2qb',
                'form_id' => 2,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Contact',
                'text' => 'Please leave your email so we can get back to you.',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'f2qc',
                'form_id' => 2,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Headache',
                'text' => 'Do you frequently experience headaches?',
                'order' => 1,
                'is_mandatory' => true,
                'mapping_key' => 'f1qa',
                'form_id' => 3,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Coordination',
                'text' => 'Do you have trouble with coordination or balance?',
                'order' => 2,
                'is_mandatory' => true,
                'mapping_key' => 'f1qb',
                'form_id' => 3,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Memory',
                'text' => 'Have you noticed any issues with your memory?',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'f1qc',
                'form_id' => 3,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Work Satisfaction',
                'text' => 'On a scale from 1 to 10, how satisfied are you with your current work?',
                'order' => 1,
                'is_mandatory' => true,
                'mapping_key' => 'f1qa',
                'form_id' => 4,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Improvements',
                'text' => 'What improvements would you suggest for our company?',
                'order' => 2,
                'is_mandatory' => false,
                'mapping_key' => 'f1qb',
                'form_id' => 4,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Work Environment',
                'text' => 'Do you feel comfortable in your work environment?',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'f1qc',
                'form_id' => 4,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Welcome!',
                'text' => 'The information provided is for knowledge purposes only',
                'order' => 1,
                'is_mandatory' => false,
                'mapping_key' => 'ef31',
                'form_id' => 5,
                'question_type_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'General question',
                'text' => 'Which part of the body do you feel pain?',
                'order' => 2,
                'is_mandatory' => true,
                'mapping_key' => 'ef32',
                'form_id' => 5,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'First advice',
                'text' => 'Did you take some ibuprofen?',
                'order' => 3,
                'is_mandatory' => true,
                'mapping_key' => 'ef33',
                'form_id' => 5,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Second advice',
                'text' => 'Have you had massages in the zone?',
                'order' => 4,
                'is_mandatory' => true,
                'mapping_key' => 'ef34',
                'form_id' => 5,
                'question_type_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('question_options')->insert([
            [
                'order' => 1,
                'title' => 'Yes, I have been diagnosed with high blood pressure',
                'next_question' => -1,
                'form_question_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'order' => 2,
                'title' => 'No, I have not been diagnosed with high blood pressure',
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
                'title' => 'Welcome to the form',
                'answer' => 'Not apply',
                'form_instance_id' => 1,
                'question_type_id' => 1,
                'mapping_key' => 'f1qa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Chest Pain',
                'answer' => 'Not for now',
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'mapping_key' => 'f1qb',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Breath Shortness',
                'answer' => 'Yes, at nights',
                'form_instance_id' => 1,
                'question_type_id' => 2,
                'mapping_key' => 'f2qa',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'High Blood Pressure',
                'answer' => 'Yes, I have been diagnosed with high blood pressure',
                'form_instance_id' => 1,
                'question_type_id' => 4,
                'mapping_key' => 'f2qb',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Family History',
                'answer' => '[{"id":"3","order":"1","title":"Mother history","next_question":"-1"},{"id":"4","order":"2","title":"Father history","next_question":"-1"}]',
                'form_instance_id' => 1,
                'question_type_id' => 3,
                'mapping_key' => 'f1qc',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Smoking Habit',
                'answer' => 'No, I have not smoking habit',
                'form_instance_id' => 1,
                'question_type_id' => 5,
                'mapping_key' => 'f1qc',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}

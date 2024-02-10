<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Activity_recordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('activity_records')->insert([
            [
                'date_time'=>'2014-8-18 04:15:22',
                'ip_address'=>'192.168.100.100',
                'activity_performed'=>'Playing around',
                'session_duration'=>100,
                'activity_result'=>'Ok',
                'login_type'=>'Safari browser',
                'device_info'=>'MacOS',
                'user_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'date_time'=>'2018-10-03 10:56:17',
                'ip_address'=>'10.10.10.10',
                'activity_performed'=>'Dancing',
                'session_duration'=>500,
                'activity_result'=>'Failed',
                'login_type'=>'Chrome browser',
                'device_info'=>'Linux',
                'user_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}

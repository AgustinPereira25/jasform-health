<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Domain\Organizations\Models\Organization;

class OrganizationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('organizations')->insert([
            [
                'name'=>'UDE',
                'description'=>'Universidad de la empresa',
                'logo'=>'NA',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'Light-it',
                'description'=>'Healthcare software development',
                'logo'=>'NA',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'AWS',
                'description'=>'Amazon Web Services',
                'logo'=>'NA',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}

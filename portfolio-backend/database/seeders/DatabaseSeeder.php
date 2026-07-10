<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name' => 'Admin Portfolio',
                'password' => bcrypt('password'),
            ]
        );

        // 2. Seed Projects
        \App\Models\Project::updateOrCreate(
            ['slug' => 'aplikasi-web-inaproc-plus'],
            [
                'title' => 'Aplikasi Web INAPROC+',
                'category' => 'Web Development',
                'short_description' => 'Sistem pengadaan barang dan jasa nasional berbasis web dengan fitur analitik real-time.',
                'content' => '<p><strong>INAPROC+</strong> merupakan platform modern pengadaan barang dan jasa nasional. Dibangun dengan Laravel untuk menjamin kehandalan di sisi backend, didukung sistem antrian untuk notifikasi pengadaan, serta dashboard interaktif.</p><ul><li>Mengurangi waktu audit pengadaan hingga 40%</li><li>Integrasi API pihak ketiga (LPS/LKPP)</li><li>Keamanan data berlapis dengan enkripsi data sensitif</li></ul>',
                'github_url' => 'https://github.com/example/inaproc',
                'live_url' => 'https://inaproc.id',
                'is_featured' => true,
            ]
        );

        \App\Models\Project::updateOrCreate(
            ['slug' => 'sistem-agregator-travel'],
            [
                'title' => 'Sistem Agregator Travel',
                'category' => 'Web Development',
                'short_description' => 'Platform booking tiket dan hotel dari berbagai API maskapai dan penginapan dalam satu dashboard terintegrasi.',
                'content' => '<p>Sebuah platform pencarian dan reservasi tiket perjalanan yang mengagregasikan data real-time dari 5 API provider utama. Menggunakan Next.js App Router dengan rendering hybrid (SSR dan ISR), caching dinamis menggunakan Redis, serta rancangan basis data performa tinggi.</p>',
                'github_url' => 'https://github.com/example/travel-aggregator',
                'live_url' => null,
                'is_featured' => true,
            ]
        );

        \App\Models\Project::updateOrCreate(
            ['slug' => 'desain-ui-ux-mobile-learning'],
            [
                'title' => 'Desain UI/UX Mobile Learning',
                'category' => 'UI/UX Design',
                'short_description' => 'Desain antarmuka aplikasi pembelajaran online untuk siswa sekolah menengah.',
                'content' => '<p>Studi kasus komprehensif merancang aplikasi <i>Mobile Learning</i> menggunakan Figma. Proses desain dimulai dari user research (survei dan interview), pembuatan user persona, wireframing, hi-fidelity UI mockups, hingga prototype interaktif yang diuji menggunakan Maze.</p>',
                'github_url' => null,
                'live_url' => 'https://figma.com/file/example',
                'is_featured' => false,
            ]
        );

        // 3. Seed Experiences
        \App\Models\Experience::updateOrCreate(
            [
                'title_role' => 'Senior Web Developer',
                'company_organization' => 'Agensi Digital Kreatif',
            ],
            [
                'start_date' => '2024-01-01',
                'end_date' => null,
                'description' => "Memimpin tim frontend mengembangkan 10+ proyek Next.js/Tailwind.\nMengintegrasikan CMS headless dan REST API.\nOptimalisasi performa Core Web Vitals hingga mencapai skor 95+.",
                'type' => 'Pekerjaan',
            ]
        );

        \App\Models\Experience::updateOrCreate(
            [
                'title_role' => 'Asisten Laboratorium Keamanan Sistem Informasi',
                'company_organization' => 'Universitas Telkom',
            ],
            [
                'start_date' => '2023-08-01',
                'end_date' => '2023-12-31',
                'description' => "Mengajar praktikum kriptografi dan keamanan jaringan untuk 4 kelas.\nMenyusun modul praktikum serangan Web Application Vulnerabilities (SQL injection, XSS).\nMenilai tugas praktikum dan laporan akhir mahasiswa.",
                'type' => 'Asisten Lab',
            ]
        );

        \App\Models\Experience::updateOrCreate(
            [
                'title_role' => 'Ketua Himpunan Mahasiswa Informatika',
                'company_organization' => 'KM Informatika',
            ],
            [
                'start_date' => '2022-09-01',
                'end_date' => '2023-09-01',
                'description' => "Memimpin organisasi kemahasiswaan beranggotakan 120 orang aktif.\nMengkoordinasikan program kerja pengabdian masyarakat (desa digital) dan kompetisi hacking nasional.\nMenghubungkan komunikasi antara mahasiswa dengan jajaran program studi.",
                'type' => 'Organisasi',
            ]
        );

        // 4. Seed Skills
        \App\Models\Skill::updateOrCreate(
            ['name' => 'Laravel'],
            [
                'category' => 'Hard Skill',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 text-red-500 fill-current"><path d="M20.085 10.224l-3.917-2.262v4.524l3.917-2.262zm-5.417-3.128L10.751 4.834v4.524l3.917-2.262zm0 6.256V8.828l-3.917 2.262v4.524l3.917-2.262zm-5.417 3.128l-3.917-2.262v4.524l3.917-2.262z"/></svg>',
            ]
        );

        \App\Models\Skill::updateOrCreate(
            ['name' => 'Next.js'],
            [
                'category' => 'Hard Skill',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 text-zinc-900 dark:text-zinc-100 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.57 15.34l-3.18-8.12h1.57l2.36 6.13 2.37-6.13h1.57l-3.18 8.12H10.43z"/></svg>',
            ]
        );

        \App\Models\Skill::updateOrCreate(
            ['name' => 'Tailwind CSS'],
            [
                'category' => 'Hard Skill',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 text-sky-400 fill-current"><path d="M12 3c-1.2 0-2.4.6-3.6 1.8-1.2 1.2-1.8 2.4-1.8 3.6 0 1.2.6 2.4 1.8 3.6 1.2 1.2 2.4 1.8 3.6 1.8 1.2 0 2.4-.6 3.6-1.8 1.2-1.2 1.8-2.4 1.8-3.6 0-1.2-.6-2.4-1.8-3.6-1.2-1.2-2.4-1.8-3.6-1.8zm0 6c-.6 0-1.2-.3-1.8-.9-.6-.6-.9-1.2-.9-1.8 0-.6.3-1.2.9-1.8.6-.6 1.2-.9 1.8-.9.6 0 1.2.3 1.8.9.6.6.9 1.2.9 1.8 0 .6-.3 1.2-.9 1.8-.6.6-1.2.9-1.8.9z"/></svg>',
            ]
        );

        \App\Models\Skill::updateOrCreate(
            ['name' => 'Figma'],
            [
                'category' => 'Tools',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 text-purple-500 fill-current"><path d="M8.5 2C6.57 2 5 3.57 5 5.5S6.57 9 8.5 9H12V2H8.5zM12 9v6h3.5c1.93 0 3.5-1.57 3.5-3.5S17.43 9 15.5 9H12zm-3.5 3c-1.93 0-3.5 1.57-3.5 3.5S6.57 19 8.5 19H12v-7H8.5zm7-3c-1.93 0-3.5 1.57-3.5 3.5V19h3.5c1.93 0 3.5-1.57 3.5-3.5S17.43 12 15.5 12z"/></svg>',
            ]
        );

        \App\Models\Skill::updateOrCreate(
            ['name' => 'Komunikasi'],
            [
                'category' => 'Soft Skill',
                'icon_svg' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 h-12 text-amber-500 fill-none stroke-current" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>',
            ]
        );
    }
}

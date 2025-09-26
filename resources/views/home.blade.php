<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fanie - Web Developer</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

</head>

<body>
    <div class="custom-cursor"></div>
    <canvas id="three-canvas"></canvas>

    <section class="hero">
        <div class="container">
            <div class="intro-section">
                <h1>Hi, <span>I'm Fanie</span></h1>
                <h2>Web Dev Student</h2>
                <h2> . </h2>
            </div>
        </div>
    </section>

    <section class="about">
        <div class="about-container">
            <h2>Formations & Expériences</h2>
            <div class="experiences-timeline">
                <div class="timeline-item">
                    <div class="container-exp">
                        <div class="container-date-title">
                            <p class="exp-date">Mai - Juillet 2025</p>
                            <p class="exp-title">Stagiaire Alstom Crespin Développeur Web</p>
                        </div>
                        <p class="exp-desc">Refonte graphique de site web interne en utilisant Blazor, C# etc. Créations de logos, charte graphique etc.</p>
                    </div>
                    <div class="timeline-point"></div>
                </div>

                <div class="timeline-item">
                    <div class="container-exp">
                        <div class="container-date-title">
                            <p class="exp-date">Septembre 2024 - Présent</p>
                            <p class="exp-title">BUT Métiers du Multimédia et de l'Internet IUT de Lens</p>
                        </div>
                        <p class="exp-desc">Le BUT MMI, c’est 3 ans où j’ai pu et continue d’apprendre à créer des projets numériques complets. J’y développe mes compétences en design, communication, développement web et gestion de projets, pour concevoir des sites, applications et contenus interactifs. La spécialité Web me permet de me perfectionner en programmation et technologies web modernes.</p>
                    </div>
                    <div class="timeline-point"></div>
                </div>

                <div class="timeline-item">
                    <div class="container-exp">
                        <div class="container-date-title">
                            <p class="exp-date">2023</p>
                            <p class="exp-title">Baccalauréat Général</p>
                        </div>
                        <p class="exp-desc">Spécialité <strong> Mathématique</strong> & Spécialité <strong> Numérique et Sciences de l'Informatique</strong> <br> Mention Très Bien</p>
                    </div>
                    <div class="timeline-point"></div>
                </div>


            </div>

        </div>
    </section>
    <section class="skills">
        <div class="skills-container">
            <h2>Mes compétences</h2>
            <div class="skills-contain">

                <div class="skills-box">
                    <h3>Front End</h3>
                    <div>
                        <img src="{{ asset('Images/html.png') }}" alt="logo html" />
                        <p>HTML</p>
                    </div>
                    <div>
                        <img src="{{ asset('Images/css.png') }}" alt="logo css" />
                        <p>CSS</p>
                    </div>

                    <div>
                        <img src="{{ asset('Images/tailwind.png') }}" alt="logo tailwind" />
                        <p>Tailwind</p>
                    </div>

                    <div>
                        <img src="{{ asset('Images/javascript.png') }}" alt="logo javascript" />
                        <p>Javascript</p>
                    </div>
                    <div>
                        <img class="blade-image-size" src="{{ asset('Images/blade.png') }}" alt="logo blade" />
                        <p>Blade</p>
                    </div>
                    <div>
                        <img class="blazor-image-size" src="{{ asset('Images/blazor.png') }}" alt="logo blazor" />
                        <p>Blazor</p>
                    </div>
                    <div>
                        <img class="mudblazor-image-size" src="{{ asset('Images/mudblazor.png') }}" alt="logo mudblazor" />
                        <p>MudBlazor</p>
                    </div>
                </div>

                <div class="skills-box">
                    <h3>Back End</h3>
                    <div>
                        <img src="{{ asset('Images/php.png') }}" alt="logo php" />
                        <p>PHP</p>
                    </div>

                    <div>
                        <img src="{{ asset('Images/mysql.png') }}" alt="logo mysql" />
                        <p>MYSQL</p>
                    </div>
                    <div>
                        <img class="laravel-image-size" src="{{ asset('Images/laravel.png') }}" alt="logo laravel" />
                        <p>Laravel</p>
                    </div>
                    <div>
                        <img class="cpp-image-size" src="{{ asset('Images/cpp.png') }}" alt="logo c++" />
                        <p>C++</p>
                    </div>
                    <div>
                        <img class="python-image-size" src="{{ asset('Images/python.png') }}" alt="logo python" />
                        <p>Python</p>
                    </div>


                </div>
                <div class="skills-box">
                    <h3>Création Graphique</h3>
                    <div>

                        <img class="figma-image-size" src="{{ asset('Images/figma.png') }}" alt="logo figma " />
                        <p>Figma</p>
                    </div>

                    <div>
                        <img class="blender-image-size" src="{{ asset('Images/blender.png') }}" alt="logo blender " />
                        <p>Blender</p>
                    </div>
                    <div>
                        <img class="canva-image-size" src="{{ asset('Images/canva.png') }}" alt="logo canva " />
                        <p>Canva</p>
                    </div>
                    <div>
                        <img class="illustrator-image-size" src="{{ asset('Images/illustrator.png') }}" alt="logo illustrator " />
                        <p>illustrator</p>
                    </div>
                    <div>
                        <img class="photoshop-image-size" src="{{ asset('Images/photoshop.png') }}" alt="logo photoshop" />
                        <p>Photoshop</p>
                    </div>
                    <div>
                        <img class="premiere-image-size" src="{{ asset('Images/premiere.png') }}" alt="logo premiere" />
                        <p>Premiere Pro</p>
                    </div>
                    <div>
                        <img class="aftereffect-image-size" src="{{ asset('Images/aftereffect.png') }}" alt="logo aftereffect" />
                        <p>After Effect</p>
                    </div>

                </div>
                <div class="skills-box">
                    <h3>Autre</h3>
                    <div>
                        <img class="git-image-size" src="{{ asset('Images/git.png') }}" alt="logo git " />
                        <p>Git</p>
                    </div>
                    <div>
                        <img class="linux-image-size" src="{{ asset('Images/linux.png') }}" alt="logo linux " />
                        <p>Linux</p>
                    </div>
                    <div>
                        <img class="docker-image-size" src="{{ asset('Images/docker.png') }}" alt="logo docker " />
                        <p>Docker</p>
                    </div>
                </div>
                <div class="skills-box">
                    <h3>J'apprend...</h3>
                    <div>
                        <img class="dart-image-size" src="{{ asset('Images/dart.png') }}" alt="logo dart " />
                        <p>Dart</p>
                    </div>
                    <div>
                        <img class="flutter-image-size" src="{{ asset('Images/flutter.png') }}" alt="logo flutter " />
                        <p>Flutter</p>
                    </div>
                    <div>
                        <img class="java-image-size" src="{{ asset('Images/java.png') }}" alt="logo java " />
                        <p>Java</p>
                    </div>
                </div>


            </div>
        </div>
        </div>

    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
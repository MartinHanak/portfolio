
import { Project } from './Project'

export function Projects() {
    return (
        <div id="Projects">
            Projects here...
            <Project url={"/test_video.mp4"} />
            <Project url={"/gravitorium.mp4"} />
        </div>
    )
}
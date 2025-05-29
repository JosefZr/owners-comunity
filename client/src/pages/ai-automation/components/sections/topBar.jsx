import styled from "styled-components"

const Div = styled.div`
        z-index: 999;
    color: rgb(255, 255, 255);
    text-align: center;
    letter-spacing: 0px;
    text-transform: uppercase;
    font-size: 0.88rem;
    font-weight: 500;
`
const Content = styled.div`
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2.5rem;
    display: flex;
    position: relative;
`

export default function TopBar() {
    return (
        <Div>
            <Content className="hash-background">
                ⚠ We Only Take 2–3 New Clients Per Month.
                <a href="/" style={{
                    fontWeight: "bold",
                    paddingLeft: "5px",
                    textDecoration: "underline",
                    transition: "opacity 0.2s"
                }}>
                    Let’s Get to work!
                </a>
            </Content>
        </Div>
    )
}

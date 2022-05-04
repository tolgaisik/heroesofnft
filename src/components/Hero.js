import Card from "react-bootstrap/Card";
import { capitalize } from "../constants/Common";
function Hero({ character, name, attributes, description, image }) {
	return (
		<Card>
			<Card.Img variant="top" src={image} alt="token image" />
			<Card.Body>
				{attributes.map((attribute, index) => {
					return (
						<Card.Text key={index}>
							{capitalize(
								attribute?.trait_type.toString()
							) +
								" : " +
								capitalize(
									attribute?.value.toString()
								)}
						</Card.Text>
					);
				})}
			</Card.Body>
		</Card>
	);
}
export default Hero;

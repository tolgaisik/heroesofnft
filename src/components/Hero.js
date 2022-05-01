import Card from "react-bootstrap/Card";
import { useCallback } from "react";
function Hero({ character, name, attributes, description, image }) {
	const capitalize = useCallback((string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}, []);
	return (
		<Card>
			<Card.Img variant="top" src={image} alt="token image" />
			<Card.Body>
				{attributes.map((attribute, index) => {
					return (
						<Card.Text key={index}>
							{capitalize(
								attribute.trait_type.toString()
							) +
								" : " +
								capitalize(
									attribute.value.toString()
								)}
						</Card.Text>
					);
				})}
			</Card.Body>
		</Card>
	);
}
export default Hero;
